/*
 * @Author: Lienren 
 * @Date: 2018-04-09 17:32:19 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-10 17:34:34
 */
'use strict';

const comm = require('./comm');

module.exports = {
  getTimeStamp: function(second) {
    let date = new Date().getTime();

    if (second && comm.isNumber(second)) {
      date += second * 1000;
    }

    return date;
  },
  timestampToTime: function(timestamp) {
    if (/^\d{10}$/.test(timestamp)) {
      timestamp = new Date(parseInt(timestamp) * 1000);
    }

    let date = new Date(timestamp);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  }
};
