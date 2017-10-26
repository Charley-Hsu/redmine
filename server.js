var http = require("http"),
 url = require("url"),
 superagent = require("superagent"),
 cheerio = require("cheerio"),
 async = require("async"),
 eventproxy = require('eventproxy');
 Entities = require('html-entities').XmlEntities;
 request = require('request');

var entities = new Entities();;
var ep = new eventproxy();
var request = request.defaults({jar: true})

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
    superagent.get("http://redmine.51tiangou.com/projects/tgou_project/issues/new?issue[parent_issue_id]=26823&issue[tracker_id]=4")
        .set("Cookie", cookie)
        .redirects(0)
        // .set("connection","keep-alive")
        // .query({'issue[parent_issue_id]' : 26823 })
        // .query({'issue[tracker_id]' : 4 })
        .query({'random' : random })
        .end(function(err,res){
            var $ =  cheerio.load(res.text);
            var token =  $('input[type="hidden"][name="authenticity_token"]').val();
            //从response中得到cookie
            console.log(res.status)
                var cookie = res.header['set-cookie'][0];
                cookie = (cookie.split(";"))[0];
                console.log("333333333333333333333333333333333333333333333333333333",cookie)
                // callback(null,cookie,token)
        });
}

var addRequirement = function addRequirement(cookie,token,callback){
    var str = '&#x2713;';
    var utf8 = entities.decode(str);
    console.log("22222222222222222222222",cookie)

    var j = request.jar();
    var cookie = request.cookie(cookie);
    var url = 'http://redmine.51tiangou.com/projects/tgou_project/issues';
    j.setCookie(cookie, url);
    request.defaults({
      headers: {'Referer': 'http://redmine.51tiangou.com/projects/tgou_project/issues'}
    })
    //status_id 状态 priority_id 优先级 assigned_to_id 指向id category_id 类别 fixed_version_id 目标版本
    var formData = {
        'utf8' : utf8,
        'authenticity_token' : token,
        // 'issue[is_private]' : 0,
        'issue[tracker_id]' : 2,
        'issue[subject]' : '自动测试9',
        // 'issue[description]' : '',
        // 'issue[status_id]' : 1,
        // 'issue[priority_id]' : 2,
        'issue[assigned_to_id]' : 122,
        // 'issue[category_id]' : 7,
        'issue[fixed_version_id]' : 206,
        'issue[parent_issue_id]' : 26823,
        // 'issue[start_date]' : 2017-10-26,
        // 'issue[due_date]' : 2017-10-29,
        'issue[estimated_hours]' : 5,
        'issue[done_ratio]' : 0,
        'issue[custom_field_values][3]' : 'web',
        'attachments[dummy][file]' : {
          value : '',
          options: {
            filename: '',
            contentType: 'application/octet-stream'
          }
        },
        'commit' : '创建'
    };
    request.post({url: url, jar: j, formData: formData}, function optionalCallback(err, httpResponse, body) {
      console.log('+++++++++++++++++++++++++++++++', body);
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


function start(){
    async.waterfall([getToken,login,page,detail,addRequirement],function(err,result){  
      
        // if (err) {  
        //     console.log(err);  
        // }  
       // console.log("result : "+result);  
    })  
}   
exports.start= start;