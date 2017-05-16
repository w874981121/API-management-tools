/**
 * Created by wangyanqi on 2017/4/3.
 * 项目数据结构
 */
'use strict';
const mongoose = require('mongoose');
const mongooseFile = mongoose.createConnection('mongodb://127.0.0.1:27017/file');
var FileDataStructure = new mongoose.Schema({
  uuid: String,
  filename: String,
  describe: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    },
  }
})
// 检测并修改存入数据时间
FileDataStructure.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next();
})
// 操作数据库方法类
FileDataStructure.statics = {
  // 返回全部数据
  fetch: function (uuid, cb) {
    return this
      .find({uuid: uuid})
      .sort('mate.updateAt')
      .exec(cb)
  },
  // 账号信息查找
  // 传入账户进行查找
  findById: function (uuid, cb) {
    return this.findOne({uuid: uuid}).exec(cb)
  },
  // 验证项目名是否存在
  findByName: function (uuid, filename, cb) {
    return this.findOne({uuid: uuid, filename: filename}).exec(cb)
  },
// 修改添加数据
  updataByFile: function (uuid, file, cb) {
    return this.update({uuid: uuid}, {$push: {file: {filename: file.filename, describe: file.describe}}}, {multi: false, upsert: true}).exec(cb)
  }
}
const File = mongooseFile.model('File', FileDataStructure)
module.exports = File;
