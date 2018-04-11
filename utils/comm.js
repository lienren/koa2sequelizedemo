/*
 * @Author: Lienren 
 * @Date: 2018-04-10 12:12:48 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-10 19:35:20
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
  }
};
