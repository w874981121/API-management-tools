/**
 * Created by wangyanqi on 2017/4/6.
 *
 * 验证码模块
 */
'use strict';
const ccap = require('ccap');
const Vcode = {
  code: '',
  img: function () {
    // console.log(this)
    let vc = ccap(300, 108, 100).get();
    this.code = vc[0]
    return new Buffer(vc[1]).toString('base64')
  },
  codes(v) {
    // console.log(v)
    // console.log(this.code)
    return v == this.code ? true : false
  }
}

module.exports = Vcode;
