/**
 * Created by wangyanqi on 2017/4/5.
 *
 *  hash算法 函数
 *
 */

'use strict';
const crypto = require('crypto');
function hmacAlgorithm(algorithm) {
  var shasum = crypto.createHmac(algorithm);
  return {
    field: function (string) {
      if (string) {
        shasum.update(string);
        let _hash = shasum.digest('hex');
        return _hash
      }
    }
  }
}
// 短KEY的测试
module.exports = new hmacAlgorithm('sha1');
