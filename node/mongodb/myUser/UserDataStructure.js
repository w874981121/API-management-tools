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
// 检查存入数据是否存在
UserDataStructure.pre('save', function(next){
  console.log(this)
  console.log('上面是传入值')
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
  // id查找
  findById: function (id, cb) {
    return this
      .findOne({_id, id})
      .exec(cb)
  }
}
module.exports = UserDataStructure
