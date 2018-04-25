/*
 * @Author: Lienren 
 * @Date: 2018-04-09 16:46:25 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-23 15:37:17
 */
'use strict';

const date = require('../utils/date');
const error_msg = require('../configs/error');

async function output_result(ctx, next) {
  try {
    await next();

    let request_result = {
      code: 0,
      message: 'success',
      reslut: ctx.body
    };

    ctx.body = { ...request_result };
  } catch (err) {
    console.log('err:', err);
    let out_code = err.code || '999999';
    let out_msg = error_msg[err.message].out_msg || err.message;

    let request_result = {
      code: out_code,
      message: out_msg,
      reslut: {}
    };

    ctx.body = { ...request_result };
  }
}

module.exports = async function(ctx, next) {
  await output_result(ctx, next);
};
