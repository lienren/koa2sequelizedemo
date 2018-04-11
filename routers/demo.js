/*
 * @Author: Lienren 
 * @Date: 2018-04-08 17:29:10 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-09 16:54:15
 */
'use strict';

const Router = require('koa-router');

const router = new Router();

router
  .get('/', async (ctx, next) => {
    console.log('hello world!');

    ctx.body = `<h1>你好</h1>`;

    next();
  })
  .get('/users', async (ctx, next) => {
    let id = ctx.request.body.id || 1;

    const User = ctx.orm().user_infos;
    let result = await User.findAll({
      where: {
        id: id
      }
    });

    ctx.body = result;

    next();
  })
  .get('/oauth', async (ctx, next) => {
    const oauth = ctx.orm().tb_oauth;
    let result = await oauth.findAll();

    ctx.body = result;

    next();
  });

module.exports = router.routes();
