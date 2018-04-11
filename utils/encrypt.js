/*
 * @Author: Lienren 
 * @Date: 2018-04-10 14:16:35 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-10 14:17:01
 */
'use strict';

const md5 = require('md5');

module.exports = {
  md5: str => {
    return md5(str);
  }
};
