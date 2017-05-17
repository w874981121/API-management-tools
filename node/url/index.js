/**
 * Created by wangyanqi on 2017/4/1.
 * 用户操作接口
 */
'use strict';
//登陆
const express = require('express');
const router = express.Router();
const hashsha1 = require('../mongodb/hash');
// const Vcode = require('./ccap');//验证码
const mongoose = require('mongoose');
const User = require('../mongodb/myUser')

// 注册接口
// 一段接口验证账号是否存在
router.get('/register', function (req, res, next) {
  let data = {}
  User.findByName(req.query.username, function (err, string) {
    if (err) {
      data.err = err
      res.end(JSON.stringify(data));
    } else {
      if (string) {
        data.string = string
        data.err = true;
        data.prompt = '账号已存在！'
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
      /*
      if (req.query.invitationcode - 0 === 11428020) {
        next()
      } else {
        data.state = false;
        data.prompt = '邀请码错误！'
        res.end(JSON.stringify(data));
      }
      */
      next()
    } else {
      data.state = true;
      data.prompt = '请输入邀请码！'
      res.end(JSON.stringify(data));
    }
  } else {
    data.state = true;
    data.nameState = true;
    data.prompt = '账号未被注册！'
    res.end(JSON.stringify(data));
  }
})
// 三段写入数据库
router.get('/register', function (req, res) {
  let data = {}
  let doc = {
    username: req.query.username,
    password: hashsha1(req.query.password)
  }
  new User(doc).save(function (err) {
    if (err) {
      console.log(err)
      data.err = err;
      data.state = false;
      data.prompt = '注册失败！'
      res.end(JSON.stringify(data));
    } else {
      data.state = true;
      data.prompt = '注册成功！'
      res.end(JSON.stringify(data));
    }
  })
})

//登陆功能
router.get('/go', function (req, res, next) {
  let data = {};
    if (req.query.username && req.query.password) {
      User.findByName(req.query.username, function (err, string) {
        if (err) {
          console.log(err, 错误)
          data.err = err
          data.state = false;
          res.end(JSON.stringify(data));
        } else {
          if (string && string.password === hashsha1(req.query.password)) {
            data.state = true;
            data.uuid = string._id;
            data.nickname = string.username;
            data.prompt = '登录成功！'
          } else {
            data.state = false;
            data.prompt = '账号或密码错误！'
          }
          res.end(JSON.stringify(data));
        }
      })
    } else {
      data.err = false
      data.prompt = '请输入完整信息！'
      res.end(JSON.stringify(data));
    }
})

module.exports = router;
