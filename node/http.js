/**
 * Created by wangyanqi on 2017/3/29.
 */
'use strict';
const express = require('express');
const data = {name: "王延琦", age: 25}
// 数据库
const mongoose = require('mongoose');
const User = require('./mongodb/myUser')
var ddd = mongoose.connect('mongodb://127.0.0.1:27017/user');

var doc = {username : 'w87498112', password : '11428020'};
var doc2 = {username : '123456', password : '1233499999995'};

var mongooseModel = new User(doc2);

mongooseModel.save(function(err){
  console.log(err)
})

User.fetch(function(err, users){
  if(err) {
    console.log(err,"错误")
    return
  }
  console.log(users,'空')
})

const app = express();
app.get('/name', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  console.log(req.path)
  console.log(req.query)
  if (req.query && req.query.callback) {
    let str = req.query.callback + '(' + JSON.stringify(data) + ')';
    res.end(str)
  } else {
    res.end(JSON.stringify(data));
  }
})

var server = app.listen(3000, function () {
  var port = server.address().port
  console.log("应用实例，访问地址为http://", port)
})


