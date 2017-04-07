/**
 * Created by wangyanqi on 2017/3/29.
 */
'use strict';
const express = require('express');
const session = require('express-session');
// const cookieParser = require('cookie-parser');
const routes=require('./url/index');
// const data = {name: "王延琦", age: 25}
// 数据库
// const mongoose = require('mongoose');
// var ccap = require('ccap');
// const User = require('./mongodb/myUser')
//
// mongoose.connect('mongodb://127.0.0.1:27017/user');

// var doc = {username: 'w87498112', password: '11428020'};
// // var doc2 = {username: '123456', password: '1233499999995'};
//
// var mongooseModel = new User(doc);
//
// mongooseModel.save(function (err) {
//   console.log(err)
// })
//
// User.updataByPassword('','ppppppp',function (err, numberAffected, raw) {
//   if (err) return console.log(err);
//
//   console.log('修改数目', numberAffected);
//   console.log('这是什么 ', raw);
// })
//
// User.fetch(function(err, users){
//   if(err) {
//     console.log(err,"错误")
//     return
//   }
//   // console.log(users)
// })

const app = express();

var server = app.listen(3000, function () {
  var port = server.address().port
  console.log("应用实例，访问地址为http://", port)
})

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use('/', routes);
