/**
 * Created by wangyanqi on 2017/4/1.
 */
'use strict';
//登陆
const express = require('express');
const router = express.Router();
const hashsha1 = require('../mongodb/hash');
const Vcode = require('./ccap');//验证码
const mongoose = require('mongoose');
const User = require('../mongodb/myUser')
const db = mongoose.connect('mongodb://127.0.0.1:27017/user');

// 注册接口
// 一段接口验证账号是否存在
router.get('/register', function (req, res, next) {
  let data = {}
  User.findByName(req.query.username, function (err, string) {
    if (err) {
      console.log(err, 错误)
      data.err = err
      res.end(JSON.stringify(data));
    } else {
      if (string) {
        data.string = string
        data.statr = true;
        data.prompt = '账号已存在'
        res.end(JSON.stringify(data));
      } else {
        next()
      }
    }
  })
})
// 二段接口验证密码和邀请码
router.get('/register', function (req, res, next) {
  let data = {}
  if (req.query.password) {
    if (req.query.invitationcode) {
      if (req.query.invitationcode - 0 === 11428020) {
        next()
      } else {
        data.prompt = '邀请码错误'
        res.end(JSON.stringify(data));
      }
    } else {
      data.prompt = '请输入邀请码'
      res.end(JSON.stringify(data));
    }
  } else {
    data.statr = false;
    res.end(JSON.stringify(data));
  }
})
// 三段写入数据库
router.get('/register', function (req, res) {
  let data = {}
  let doc = {
    username: req.query.username,
    password: hashsha1.field(req.query.password)
  }
  new User(doc).save(function (err) {
    if (err) {
      console.log(err)
      data.err = err;
      data.prompt = '注册失败'
      res.end(JSON.stringify(data));
    } else {
      data.msg = true;
      data.prompt = '注册成功'
      res.end(JSON.stringify(data));
    }
  })
})


//登陆功能
// 一段返回验证码图片
router.get('/', function (req, res, next) {
  let data = {};
  if (req.query.username) {
    if (req.query.vc && req.query.password) {
      // console.log(req.session.vc, '空白')
      if (req.session.vc !== req.query.vc) {
        data.prompt = '验证码错误'
        console.log(req.query.vc)
        res.end(JSON.stringify(data));
      }
      User.findByName(req.query.username, function (err, string) {
        if (err) {
          console.log(err, 错误)
          data.err = err
          res.end(JSON.stringify(data));
        } else {
          if (string && string.password === hashsha1.field(req.query.password)) {
            data.statr = true;
          } else {
            data.statr = false;
            data.prompt = '账号或密码错误'
          }
          res.end(JSON.stringify(data));
        }
      })
    } else {
      data.prompt = '请输入完整信息'
      res.end(JSON.stringify(data));
    }
  } else {
    data.vc = Vcode.img();
    console.log(req.session)
    req.session.vc = Vcode.code;
    console.log(req.session)
    res.end(JSON.stringify(data));
  }
})
// 二段对照验证码
// router.get('/login', function (req, res) {
//   let data = {};
//
// })


module.exports = router;
