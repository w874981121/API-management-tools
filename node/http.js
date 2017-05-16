/**
 * Created by wangyanqi on 2017/3/29.
 */
'use strict';
const express = require('express');
const session = require('express-session');
const app = express();
var server = app.listen(3000, function () {
  var port = server.address().port
  console.log("应用实例，访问地址为http://", port)
})


app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 登陆接口
const routes = require('./url/index');
app.use('/login', routes);

// 创建项目
const routesFile = require('./newfile/index');
app.use('/file', routesFile);

// 项目目录结构
const routesCatalog = require('./catalog/index');
app.use('/catalog', routesCatalog);

