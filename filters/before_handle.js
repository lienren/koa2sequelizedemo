/*
 * @Author: Lienren 
 * @Date: 2018-04-09 16:41:32 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-13 15:34:48
 */
'use strict';

const Op = require('sequelize').Op;
const assert = require('assert');
const date = require('../utils/date');
const error_msg = require('../configs/error');
const request_log = require('./request_log');

async function token_verify(ctx, next) {
  let token = ctx.request.header.token || '';
  let url = ctx.request.url || '';
  let begin_time = date.getTimeStamp();

  try {
    let api = await ctx.orm().base_apis.findOne({
      where: {
        url: url
      }
    });

    assert.notStrictEqual(api, null, 'api_not_exists');

    ctx.work = {
      before_time: begin_time,
      url: url,
      api: api,
      param: ctx.request.body,
      admin: {}
    };

    // api接口存在
    if (api.isvisitor !== 1) {
      // 需要验证Token
      // 通过Token获取管理员信息，并且在有
      let admin = await ctx.orm().admin_infos.findOne({
        where: {
          token: token,
          tokentime: {
            [Op.gt]: unix_time
          }
        }
      });

      assert.notStrictEqual(admin, null, 'token_is_error');

      ctx.work = {
        ...ctx.work,
        admin: admin
      };

      await next();
    } else {
      // 不需要验证Token
      await next();
    }
  } catch (err) {
    console.log('err:', err);
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

    await request_log(ctx, next);
  }
}

module.exports = async function(ctx, next) {
  await token_verify(ctx, next);
};
