var http = require("http"),
 url = require("url"),
 superagent = require("superagent"),
 cheerio = require("cheerio"),
 async = require("async"),
 Entities = require('html-entities').XmlEntities;
 request = require('request');
 express = require('express');
 bodyParser = require('body-parser');

var app = express();
var entities = new Entities();
var request = request.defaults({jar: true});
var start_cookie = '';

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
var server = app.listen(3636, function () {
  console.log('listening');
});
// POST /login 获取 URL编码的请求体
// app.post('/login', urlencodedParser, function (req, res) {
//   if (!req.body) return res.sendStatus(400)
//   res.send('welcome, ' + req.body.username)
// })

// POST /api/users 获取 JSON 编码的请求体
// app.post('/api/users', jsonParser, function (req, res) {
//   if (!req.body) return res.sendStatus(400)
//   // create user in req.body
// })
//   async.waterfall([getToken,login,page],function(err,result){ 
//      res.send(JSON.stringify(result));
// }) 
app.get('/info', function (req, res) {
    var dd = {};
    request('http://redmine.51tiangou.com', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var $ =  cheerio.load(response.body);
        var token =  $('input[type="hidden"][name="authenticity_token"]').val();
        //从response中得到cookie
        if (response.headers['set-cookie']) {
            var cookie = response.headers['set-cookie'][0];
                cookie = (cookie.split(";"))[0];
                start_cookie = cookie;
        }else{
          cookie = start_cookie;
        }
      }
      var obj = {
        cookie:cookie,
        token:token
      }
      dd = obj;
      res.send(JSON.stringify(dd));
    })
});

app.post('/login', jsonParser, function (req, res) {
   var str = '&#x2713;';
   var utf8 = entities.decode(str);
   var cookie = req.body.cookie;
   var username = req.body.username;
   var password = req.body.password; 
   var token = req.body.token;
   superagent.post('http://redmine.51tiangou.com/login')
       .type('form')
       .redirects(0)
       .set('Content-Type', 'application/x-www-form-urlencoded')
       .set("Cookie", cookie)  
       .send({username:username})
       .send({password:password})
       .send({back_url:"http://redmine.51tiangou.com/my/page"})
       .send({authenticity_token:token})
       .send({utf8:utf8})
       .end(function(err,result){
           if (err) {
               var cookie1 = result.header['set-cookie'][0];
                   cookie1 = (cookie1.split(";"))[0];
                var obj = {
                    message:'success',
                    cookie:cookie1
                }
            }else{
                var obj = {
                    message:'failed'
                }          
           }
           res.send(JSON.stringify(obj));
       })
});

app.post('/page', jsonParser, function (req, res) {

    var cookie = req.body.cookie;
    superagent.get('http://redmine.51tiangou.com/issues')
        .set("Cookie", cookie) 
        .redirects(0)
        .send({assigned_to_id:'me'})
        .send({set_filter:1})
        .end(function(err,result){
            if (err) {
                console.log("result",result); 
            }else{
                  if (result.header['set-cookie']) {
                     var cookie2 = result.header['set-cookie'][0];
                         cookie2 = (cookie2.split(";"))[0];
                  }else{
                    cookie2 = cookie;
                  }

                 var $ =  cheerio.load(result.text);
                 var requirementList= [];
                 $('.issues tbody').children("tr").each(function(i,elem){
                    var obj ={};
                    var dom = $(this).children("td");
                    if (entities.decode(dom.eq(5).html()) == '技术宣讲') {
                        obj.id = entities.decode(dom.eq(1).find('a').html())
                        obj.subject = entities.decode(dom.eq(7).find('a').html())
                        obj.pmer = entities.decode(dom.eq(3).find('a').html())
                        requirementList.push(obj);
                    }
                 })
                 requirementList.join(', ');
                 var objData = {
                    data:requirementList,
                    cookie:cookie2
                 }
                 res.send(JSON.stringify(objData));
            }
        })
});

app.post('/detail',jsonParser,function(req, res){
    var cookie = req.body.cookie;
    var id = req.body.id;
    var random = Math.random().toString(36).substr(2);
    superagent.get("http://redmine.51tiangou.com/projects/tgou_project/issues/new")
        .set("Cookie", cookie)
        .redirects(0)
        .set("connection","keep-alive")
        .query({'issue[parent_issue_id]' : id })
        .query({'issue[tracker_id]' : 4 })
        .query({'random' : random })
        .end(function(err,result){
            var $ =  cheerio.load(result.text);
            var token =  $('input[type="hidden"][name="authenticity_token"]').val();
            if (result.header['set-cookie']) {
               var cookie = result.header['set-cookie'][0];
                   cookie = (cookie.split(";"))[0];
            }
            var optionList = [];
            $("#issue_fixed_version_id option").each(function(i,elem){
                var obj = {};
                if ($(this).val()) {
                    obj.id = $(this).val();
                    obj.text = entities.decode($(this).html());
                    optionList.push(obj);  
                }
             })
            optionList.join(', ');

            var nameList = [];
            var obj = {};
            $("#issue_assigned_to_id option").each(function(i,elem){
                var name = entities.decode($(this).html()).replace(/\s+/g,'');
                if ($(this).val()&&name != '<<我>>') {
                    nameList.push(name);
                    obj[name] = $(this).val();
                }
             })
            var objData = {
               optionList:optionList,
               nameList:nameList,
               nameOption:obj,
               token:token,
               cookie:cookie
            }
            res.send(JSON.stringify(objData));
        });
})

app.post('/submit',jsonParser,function(req, res){
  var str = '&#x2713;';
  var utf8 = entities.decode(str);
  var cookie = req.body.cookie;
  var token = req.body.token;
  var version = req.body.version;
  var id = req.body.id;
  var subject = req.body.subject;
  var assigned = req.body.assigned;
  var count = 0;

  var font = function font(callback){
    callback(null,cookie)
  }

  var sub = function sub (cookie,callback){
    var formData = {
        'utf8' : utf8,
        'authenticity_token' : token,
        'issue[tracker_id]' : 2,
        'issue[assigned_to_id]' : assigned[count],
        'issue[subject]' : subject,
        'issue[fixed_version_id]' : version,
        'issue[parent_issue_id]' : id,
        'issue[done_ratio]' : 0,
        'issue[custom_field_values][3]' : 'web',
        'attachments[dummy][file]' : {
          value : '',
          options: {
            filename: '',
            contentType: 'application/octet-stream'
          }
        },
        'commit' : '创建并继续'
    };
    var j = request.jar();
    var url = 'http://redmine.51tiangou.com/projects/tgou_project/issues';
    j.setCookie(cookie, url);
    request.defaults({
      headers: {'Referer': 'http://redmine.51tiangou.com/projects/tgou_project/issues'}
    })
    request.post({url: url, jar: j, formData: formData}, function optionalCallback(err, httpResponse, body) {
        if (err) {
          callback(null,cookie);
        }else{
          count++;
          callback(null,cookie);
        }
    });
  }

  var reqArr = [font];
  for(var i = 0;i<assigned.length; i++){
    reqArr.push(sub)
  }

  async.waterfall(reqArr, function (err, result) {  
     var obj ={};
     if (result) {
        obj.message = "success";
        obj.cookie = result;
     } else {
        obj.message = err;
     }
     res.send(JSON.stringify(result));     
  });  
  
  // res.send(JSON.stringify(req.body.cookie));
})

app.post('/assignedBack',jsonParser,function(req,res){
  var cookie = req.body.cookie;

  var issue = function issue(callback){
    superagent.get('http://redmine.51tiangou.com/issues')
        .set("Cookie", cookie)
        .redirects(0)
        .set("connection","keep-alive")
        .send({assigned_to_id:'me'})
        .send({set_filter:1})
        .end(function(err,result){
          var $ =  cheerio.load(result.text);
          var token =  $('input[type="hidden"][name="authenticity_token"]').val();
          if (err) {
              console.log("result",result); 
          }else{
              if (result.header['set-cookie']) {
                 var cookie2 = result.header['set-cookie'][0];
                     cookie2 = (cookie2.split(";"))[0];
              }else{
                cookie2 = cookie;
              }
          }
              callback(null,cookie,token);
        })
  }
  var menu = function menu(cookie,token,callback){
    var str = '&#x2713;';
    var utf8 = entities.decode(str);
   superagent.get("http://redmine.51tiangou.com/issues/context_menu")
        .set("Cookie", cookie)
        .redirects(0)
        .set("connection","keep-alive")
        .query({'ids[]' : 26823 })
        .query({'utf8' : utf8 })
        .query({'authenticity_token' : token })
        .end(function(err,result){
          if (result.header['set-cookie']) {
             var cookie = result.header['set-cookie'][0];
          }
          callback(null,cookie);
        }); 
  };
      
  var update = function update(cookie,callback){
    var random = Math.random().toString(36).substr(2);

    superagent.post('http://redmine.51tiangou.com/issues/bulk_update')
          // .type('form')
          .redirects(0)
          // .set("Cookie", cookie) 
          // .set('Content-Type', 'application/x-www-form-urlencoded')
          .query({back_url:"http://redmine.51tiangou.com/issues/26823"})
          .query({'ids[]':26823})
          .query({'issue[status_id]':14})
          .query({'random' : random })
          // .send({'ids[]':26823})
          // .send({'issue[status_id]':122})
          .end(function(err,result){
            console.log("!!!!!!!!!!!!!!!!!!!!!",result.text,"~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            // console.log("@@@@@@@@@@@@@@@@@@@",result.text,"~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            callback(null,result);
          })
  } 
  async.waterfall([issue,menu,update],function(err,result){ 
       res.send(JSON.stringify(result));
  }) 
})
