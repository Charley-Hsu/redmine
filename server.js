var http = require("http"),
 url = require("url"),
 superagent = require("superagent"),
 cheerio = require("cheerio"),
 async = require("async"),
 eventproxy = require('eventproxy');
 Entities = require('html-entities').XmlEntities;

var entities = new Entities();;
var ep = new eventproxy();

// emitter.on("setCookeie", getTitles)
 
// http.createServer(function (request, response) {  
  
//     // 发送 HTTP 头部   
//     // HTTP 状态值: 200 : OK  
//     // 内容类型: text/plain  
//     response.writeHead(200, {'Content-Type': 'text/plain'});  
  
//     // 发送响应数据 "Hello World"  
//     response.end('Hello World\n');  
// }).listen(3333); 

// 登录
var getToken = function getToken(callback){
    superagent.get('http://redmine.51tiangou.com')
        .end(function(err,res){
            var $ =  cheerio.load(res.text);
            var token =  $('input[type="hidden"][name="authenticity_token"]').val();
            //从response中得到cookie
            var cookie = res.header['set-cookie'][0];
                cookie = (cookie.split(";"))[0];
            var str = '&#x2713;';
            var utf8 = entities.decode(str);
            callback(null,token,cookie,utf8)
        })
}

var login = function login(token,cookie,utf8,callback){
    superagent.post('http://redmine.51tiangou.com/login')
        .type('form')
        .redirects(0)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set("Cookie", cookie)  
        .send({username:"xuqiang"})
        .send({password:"TEce@2017"})
        .send({back_url:"http://redmine.51tiangou.com/my/page"})
        .send({authenticity_token:token})
        .send({utf8:utf8})
        .end(function(err,res){
            if (err) {
                var cookie1 = res.header['set-cookie'][0];
                    cookie1 = (cookie1.split(";"))[0];
                //console.log("+++++++++++++++++++++++++++++++++++",res.header['set-cookie'][0]);
                callback(null,cookie1)
            }else{
                 console.log("res",res.header);
                 callback(null,res)           
            }
        })
}

var page = function page(cookie,callback){
    superagent.get('http://redmine.51tiangou.com/my/page')
        .set("Cookie", cookie) 
        .end(function(err,res){
            if (err) {
                console.log("res",res);
                callback(null,res)  
            }else{
                 var cookie2 = res.header['set-cookie'][0];
                     cookie2 = (cookie2.split(";"))[0];
                 var $ =  cheerio.load(res.text);
                 var requirementList= [];
                 $('.tracker').each(function(i, elem) {
                     var str = entities.decode($(this).next().html());
                     if ($(this).text() === '需求' && str.indexOf("(技术宣讲)") > 0) {
                         var obj = {};
                         obj.type = "需求--(技术宣讲)";
                         obj.id = $(this).prev().prev().text().replace(/[\r\n]/g, "").replace(/[ ]/g,"");
                         obj.subject = entities.decode($(this).next().children().html());
                         requirementList[i] =  obj;                   
                     }
                 });
                 requirementList.join(', ');
                 console.log("1111111111111111111111",cookie2)
                 callback(null,cookie2)
            }
        })
}

var detail = function detail(cookie,callback){
    var random = Math.random().toString(36).substr(2);
    var cookiess = cookie;
    console.log("22222222222222222222222",cookie)
    superagent.get("http://redmine.51tiangou.com/projects/tgou_project/issues/new")
        .set("Cookie", cookie)
        // .redirects()
        // .set("connection","keep-alive")
        .query({'issue[parent_issue_id]' : 26823 })
        .query({'issue[tracker_id]' : 4 })
        .query({'random' : random })
        .end(function(err,res){
            var $ =  cheerio.load(res.text);
            var token =  $('input[type="hidden"][name="authenticity_token"]').val();
            //从response中得到cookie
            console.log(res.header['set-cookie'])
            // if (res.header['set-cookie']) {
                var cookie = res.header['set-cookie'][0];
                cookie = (cookie.split(";"))[0];
                console.log("333333333333333333333333333333333333333333333333333333",cookie)
                callback(null,cookie,token)
            // }else{
            //     console.log("elsessssssssssssssssssssssssssssssssss")
            //     random = Math.random().toString(36).substr(2);
            //     superagent.get("http://redmine.51tiangou.com/projects/tgou_project/issues/new")
            //         .set("Cookie", cookiess)
            //         .redirects(0)
            //         .query({'issue[parent_issue_id]' : 26823 })
            //         .query({'issue[tracker_id]' : 4 })
            //         .query({'random' : random })
            //         .end(function(err,res){
            //             var cookie = res.header['set-cookie'][0];
            //             cookie = (cookie.split(";"))[0];
            //             console.log("--------------------------------------------------------------------",token,cookie)
            //             callback(null,token,cookie)
            //         })
            // }
            // console.log(token,cookie)
            //callback(null,token,cookie)
        });
}

var addRequirement = function addRequirement(cookie,token,callback){
    var str = '&#x2713;';
    var utf8 = entities.decode(str);
    //status_id 状态 priority_id 优先级 assigned_to_id 指向id category_id 类别 fixed_version_id 目标版本
    // var data = '';
    superagent.post("http://redmine.51tiangou.com/projects/tgou_project/issues")
        .set("Cookie", cookie)      
        .set('Content-Type', 'multipart/form-data')
        .send('name=tj')
        .end(function(err,res){
            if (err) {
                console.log("*********************************",res)
            }else{
                console.log("++++++++++++++++++++++++++++++")
            }
        });
}


var list = function list(list,callback){
    console.log(list)
    process.stdin.setEncoding('utf8');
    process.stdin.resume();
        process.stdin.on('data', function(chunk) {
        process.stdin.emit('end',chunk)
    }); 
}

process.stdin.on('end', function(chunk) {
        console.log('输入的id是',chunk);

});
//主start程序
// function start(){
//     function onRequest(req, res){
//         // 设置字符编码(去掉中文会乱码)
//         res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
//         // 当所有 'BlogArticleHtml' 事件完成后的回调触发下面事件
//         ep.after('BlogArticleHtml',pageUrls.length*20,function(articleUrls){
            
//             // 获取 BlogPageUrl 页面内所有文章链接
//             for(var i = 0 ; i < articleUrls.length ; i++){
//         res.write(articleUrls[i] +'<br/>');  
//       }    
//         console.log('articleUrls.length is'+ articleUrls.length +',content is :'+articleUrls);

//         //控制并发数
//         var curCount = 0;
//         var reptileMove = function(url,callback){
//             //延迟毫秒数
//             var delay = parseInt((Math.random() * 30000000) % 1000, 10);
//               curCount++;
//               console.log('现在的并发数是', curCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');  
            
//             superagent.get(url)
//                 .end(function(err,sres){
//                     // 常规的错误处理
//                   if (err) {
//                     console.log(err);
//                     return;
//                   }         

//                   //sres.text 里面存储着请求返回的 html 内容
//                   var $ = cheerio.load(sres.text);
//                   //收集数据
//                   //1、收集用户个人信息，昵称、园龄、粉丝、关注
//                         //var currentBlogApp = $('script').eq(1).text().split(',')[0].split('=')[1].trim().replace(/'/g,""),
//                         var currentBlogApp = url.split('/p/')[0].split('/')[3], 
//                             requestId = url.split('/p/')[1].split('.')[0];

//                         res.write('currentBlogApp is '+ currentBlogApp + ' , ' + 'requestId id is ' + requestId +'<br/>'); 
//                         console.log('currentBlogApp is '+ currentBlogApp + '\n' + 'requestId id is ' + requestId); 

//                         res.write('the article title is :'+$('title').text() +'<br/>');

//                         var flag =  isRepeat(currentBlogApp);
                        
//                         if(!flag){
//                             var appUrl = "http://www.cnblogs.com/mvc/blog/news.aspx?blogApp="+ currentBlogApp;
//                             personInfo(appUrl);
//                         }
//                 });

//             setTimeout(function() {
//                 curCount--;
//                 callback(null,url +'Call back content');
//               }, delay);        
//         };

//         // 使用async控制异步抓取    
//         // mapLimit(arr, limit, iterator, [callback])
//         // 异步回调
//       async.mapLimit(articleUrls, 5 ,function (url, callback) {
//               reptileMove(url, callback);
//             }, function (err,result) {
//                 endDate = new Date();

//               console.log('final:');
//               console.log(result);
//               console.log(catchDate);
//               var len = catchDate.length,
//                 aveAge = 0,
//                 aveFans = 0,
//                 aveFocus = 0;

//               for(var i=0 ; i<len ; i++){
//                 var eachDate = JSON.stringify(catchDate[i]),
//                     eachDateJson = catchDate[i];

//                 // 小几率取不到值则赋默认值 
//                 eachDateJsonFans = eachDateJson.fans || 110;
//                 eachDateJsonFocus = eachDateJson.focus || 11;
                    
//                 aveAge += parseInt(eachDateJson.age);
//                 aveFans += parseInt(eachDateJsonFans);
//                 aveFocus += parseInt(eachDateJsonFocus);
//                 res.write(eachDate +'<br/>'); 
//               }

//               //统计结果
//               res.write('<br/>');
//               res.write('<br/>');
//               res.write('/**<br/>');
//               res.write(' * 爬虫统计结果<br/>');
//               res.write('**/<br/>');
//               res.write('1、爬虫开始时间：'+ startDate +'<br/>');
//               res.write('2、爬虫结束时间：'+ endDate +'<br/>');
//               res.write('3、耗时：'+ (endDate - startDate) +'ms' +' --> '+ (Math.round((endDate - startDate)/1000/60*100)/100) +'min <br/>');
//               res.write('4、爬虫遍历的文章数目：'+ pageNum*20 +'<br/>');
//               res.write('5、作者人数：'+ len +'<br/>');
//               res.write('6、作者入园平均天数：'+ Math.round(aveAge/len*100)/100 +'<br/>');
//               res.write('7、作者人均粉丝数：'+ Math.round(aveFans/len*100)/100 +'<br/>');
//               res.write('8、作者人均关注数：'+ Math.round(aveFocus/len*100)/100 +'<br/>');
//             });
//         });
        
//         // 轮询 所有文章列表页
//         pageUrls.forEach(function(pageUrl){
//             superagent.get(pageUrl)
//                 .end(function(err,pres){
//                     console.log('fetch ' + pageUrl + ' successful');
//                     res.write('fetch ' + pageUrl + ' successful<br/>');
//                     // 常规的错误处理
//               if (err) {
//                 console.log(err);
//                 }
//               // pres.text 里面存储着请求返回的 html 内容，将它传给 cheerio.load 之后
//               // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
//               // 剩下就都是 jquery 的内容了
//               var $ = cheerio.load(pres.text);
//               var curPageUrls = $('.titlelnk');
//               for(var i = 0 ; i < curPageUrls.length ; i++){
//                 var articleUrl = curPageUrls.eq(i).attr('href');
//                 urlsArray.push(articleUrl);
//                 // 相当于一个计数器
//                 ep.emit('BlogArticleHtml', articleUrl);
//               }
//             })
//         })
//     }

//     http.createServer(onRequest).listen(3000);
// }

function start(){
    async.waterfall([getToken,login,page,detail,addRequirement],function(err,result){  
      
        // if (err) {  
        //     console.log(err);  
        // }  
       // console.log("result : "+result);  
    })  
}   
exports.start= start;