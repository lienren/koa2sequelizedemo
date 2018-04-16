/*
 * @Author: Lienren 
 * @Date: 2018-04-10 12:12:48 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-11 12:06:09
 */
'use strict';

module.exports = {
  // 验证是否为数字
  isNumber: val => {
    var regPos = /^\d+$/; // 非负整数
    if (regPos.test(val)) {
      return true;
    } else {
      return false;
    }
  },
  // 生成随机
  rand: (min, max) => {
    return (Math.random() * (max - min + 1) + min) | 0;
  },
  // 生成随机码（字母和数字）
  randCode: len => {
    let codes = 'ABCDEFGHKMNPQRSTUVWXYZ23456789YXWVUTSRQPNMKHGFEDCBA';
    let code = '';
    for (let i = 0; i < len; i++) {
      code += codes.charAt((Math.random() * codes.length) | 0);
    }
    return code;
  },
  // 生成随机码（数字）
  randNumberCode: len => {
    let codes = '1234567890987654321';
    let code = '';
    for (let i = 0; i < len; i++) {
      code += codes.charAt((Math.random() * codes.length) | 0);
    }
    return code;
  }
};
