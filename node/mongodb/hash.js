/**
 * Created by wangyanqi on 2017/4/5.
 *
 *  hash算法 函数
 *
 */

'use strict';
const crypto = require('crypto');
const hmacAlgorithm = function (string) {
  let shasum = crypto.createHash('sha1');
  if (string) {
    shasum.update(string);
    return shasum.digest('hex');
  } else {
    return false
  }
}
// 短KEY的测试
module.exports = hmacAlgorithm;
