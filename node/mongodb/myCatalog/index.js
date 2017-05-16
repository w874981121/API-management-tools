/**
 * Created by wangyanqi on 2017/5/3.
 * 项目目录的数据模型
 */
'use strict';
const mongoose = require('mongoose');
var CatalogDataStructure = new mongoose.Schema({
  uuid: String,  //项目id
  modularname: String,   //模块名字
  describe: String,      //模块备注
  apilist: [{apiname: String, apidescribe: String}],   //api 列表
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
CatalogDataStructure.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next();
})
// 操作数据库方法类
CatalogDataStructure.statics = {
  // 返回全部数据
  fetch: function (uuid, cb) {
    return this
      .find({uuid: uuid})
      .sort('mate.updateAt')
      .exec(cb)
  },
  // 验证模块名是否存在
  findByName: function (uuid, modularname, cb) {
    return this.findOne({uuid: uuid, modularname: modularname}).exec(cb)
  },
  //验证api名是否存在
  findByApi: function (modularid, apiname, cb) {
    return this.findOne({_id: modularid,'modularlist.apiname': apiname}).exec(cb)
  },
  // 修改添api 名字
  updataByCatalogApi: function (_id, catalog, cb) {
    return this.update({_id: _id}, {$push: {apilist: {apiname: catalog.apiname, apidescribe: catalog.apidescribe}}}, {multi: false, upsert: true}).exec(cb)
  },

}
const mongooseCatalog = mongoose.createConnection('mongodb://127.0.0.1:27017/catalog');
const Catalog = mongooseCatalog.model('Catalog', CatalogDataStructure)
module.exports = Catalog;
