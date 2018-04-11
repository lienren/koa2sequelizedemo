/*
 * @Author: Lienren 
 * @Date: 2018-04-09 16:46:25 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-10 20:12:28
 */
'use strict';

const date = require('../utils/date');
const error_msg = require('../configs/error');
const request_log = require('./request_log');

async function output_result(ctx, next) {
  try {
    await next();

    let request_result = {
      code: 0,
      message: 'success',
      reslut: ctx.body
    };

    ctx.work = {
      ...ctx.work,
      request_result: request_result,
      after_time: date.getTimeStamp()
    };

    ctx.body = { ...request_result };
  } catch (err) {
    let out_code = err.code || '999999';
    let out_msg = error_msg[err.message].out_msg || err.message;

    let request_result = {
      code: out_code,
      message: out_msg,
      reslut: {}
    };

    ctx.work = {
      ...ctx.work,
      request_result: request_result,
      after_time: date.getTimeStamp()
    };

    ctx.body = { ...request_result };
  }
}

async function write_log(ctx, next) {}

module.exports = async function(ctx, next) {
  await output_result(ctx, next);

  await request_log(ctx, next);
};
