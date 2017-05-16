/**
 * Created by wangyanqi on 2017/5/3.
 * 目录操作接口
 */
'use strict';
const express = require('express');
const router = express.Router();
const Catalog = require('../mongodb/myCatalog')
// 添加一个文档信息
router.get('/catalog', function (req, res) {
  let data = {}
  Catalog.findByName(req.query.uuid, req.query.modularname, function (err, string) {
    if (!string) {
      let doc = {
        uuid: req.query.uuid,
        modularname: req.query.modularname,
        describe: req.query.describe,
      }
      new Catalog(doc).save(function (err, string, msg) {
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

// 查询所有modular
router.get('/query', function (req, res) {
  let data = {}
  Catalog.fetch(req.query.uuid, function (err, string) {
    if (err) {
      data.prompt = '失败'
      data.state = false;
      data.err = err
    } else {
      data.state = true;
      data.string = string
    }
    res.end(JSON.stringify(data));
  })
})

//添加api目录名称
router.get('/addapi', function (req, res) {
  let data = {}
  Catalog.findByApi(req.query.modularid, req.query.apiname, function (err, string) {
    if (!string) {
      Catalog.updataByCatalogApi(req.query.modularid, {
        apiname: req.query.apiname,
        describe: req.query.describe
      }, function (err, string, msg) {
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

module.exports = router;
