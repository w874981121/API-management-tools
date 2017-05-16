/**
 * Created by wangyanqi on 2017/4/28.
 * 新建项目接口
 */
'use strict';
//登陆
const express = require('express');
const router = express.Router();
const File = require('../mongodb/myFile')

// 添加一个文档信息
router.get('/project', function (req, res) {
  let data = {}
  File.findByName(req.query.uuid, req.query.filename, function (err, string) {
    if (!string) {
      let doc = {
        uuid: req.query.uuid,
        filename: req.query.filename,
        describe: req.query.describe
      }
      new File(doc).save(function (err, string, msg) {
        data.err = err
        data.string = string
        data.msg = msg
        if (err) {
          data.prompt = '失败'
          data.state = false;
          data.err = err
        } else {
          data.state = true;
          data.prompt = '创建成功'
          data.string = string
        }
        res.end(JSON.stringify(data));
      })
    } else {
      data.state = false;
      data.prompt = '已存在'
      res.end(JSON.stringify(data));
    }
  })
})
// 返回创建的项目
router.get('/listproject', function (req, res) {
  let data = {}
  File.fetch(req.query.uuid, function (err, string) {
    if (err) {
      data.err = err
      data.state = false;
      data.prompt = '返回失败'
    } else {
      data.state = true;
      data.prompt = '返回成功'
      data.string = string
    }
    res.end(JSON.stringify(data));
  })
})

module.exports = router;
