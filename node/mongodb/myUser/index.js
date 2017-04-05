/**
 * Created by wangyanqi on 2017/4/3.
 */
'use strict';
const mongoose = require('mongoose');
const UserDataStructure = require('./UserDataStructure');
//生成模型
const User = mongoose.model('User', UserDataStructure)

module.exports = User;
