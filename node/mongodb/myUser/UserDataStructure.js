/**
 * Created by wangyanqi on 2017/3/30.
 */
'use strict';
const mongoose = require('mongoose');

var UserDataStructure = new mongoose.Schema({
  username: String,
  password: String,
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
UserDataStructure.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next();
})
// 操作数据库方法类
UserDataStructure.statics = {
  // 返回全部数据
  fetch: function (cb) {
    return this
      .find({})
      .sort('mate.updateAt')
      .exec(cb)
  },
  // 账号信息查找
  // 传入账户进行查找
  findByName: function (name, cb) {
    return this
      .findOne({username: name})
      .exec(cb)
  },
  // 单条密码修改
  // 参数_name 传入修改的账户名
  // 参数_passwprd  传入修改新密码
  // cb回调返回的状态
  updataByPassword: function (_name, _password, cb) {
    return this
      .update({username: _name}, {password: _password}, {multi: false})
      .exec(cb)
  }
}
module.exports = UserDataStructure
