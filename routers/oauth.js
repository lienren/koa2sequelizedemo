/*
 * @Author: Lienren 
 * @Date: 2018-04-09 16:26:02 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-11 12:06:59
 */
'use strict';

const assert = require('assert');
const Router = require('koa-router');
const uuidv1 = require('uuid/v1');
const date = require('../utils/date');
const encrypt = require('../utils/encrypt');
const comm = require('../utils/comm');
const makeimgcode = require('../utils/makeimgcode');

const router = new Router();

router
  .post('/oauth/admin_login', async (ctx, next) => {
    let loginname = ctx.request.body.loginname || '';
    let loginpwd = ctx.request.body.loginpwd || '';

    assert.notStrictEqual(loginname, '', 'loginname_not_exists');
    assert.notStrictEqual(loginpwd, '', 'loginpwd_not_exists');

    let admin = await ctx.orm().admin_infos.findOne({
      where: {
        loginname: loginname,
        loginpwd: encrypt.md5(loginpwd)
      }
    });

    assert.notStrictEqual(admin, null, 'login_is_error');

    let token = uuidv1();
    let token_time = date.getTimeStamp(30 * 60);

    // 更新token
    admin.token = token;
    admin.tokentime = token_time;
    let admin_update = await admin.save();

    assert.notStrictEqual(admin_update, null, 'login_is_error');

    ctx.body = {
      loginname: admin.loginname,
      token: admin.token,
      tokentime: date.timestampToTime(admin.tokentime)
    };

    next();
  })
  .post('/oauth/admin_code', async (ctx, next) => {
    let code = comm.randCode(4);
    let img = await makeimgcode.makeCapcha(code, 90, 30, {
      ...{ bgColor: 0xf3f3f3, topMargin: { base: 5, min: -8, max: 8 } }
    });

    ctx.body = {
      imgbase64: 'data:image/bmp;base64,' + img.getFileData().toString('base64')
    };

    next();
  });

module.exports = router.routes();
