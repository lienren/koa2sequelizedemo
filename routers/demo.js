/*
 * @Author: Lienren 
 * @Date: 2018-04-08 17:29:10 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-23 16:58:21
 */
'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const router = new Router();

let phoneToJsonUtil = {};

phoneToJsonUtil.getData = async (model, page, pageSize, fileContent) => {
  let result = await model.findAndCountAll({
    where: '',
    offset: (page - 1) * pageSize,
    limit: pageSize,
    raw: true
  });

  _.each(result.rows, data => {
    fileContent[data.phone_no2] = {
      ...data
    };
  });

  if (result.rows.length >= pageSize) {
    await phoneToJsonUtil.getData(model, ++page, pageSize, fileContent);
  }

  return fileContent;
};

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
  })
  .get('/phonetojson', async (ctx, next) => {
    let page = 1;
    let pageSize = 1000;

    const phones = ctx.orm().base_phone_plus;
    let result = await phoneToJsonUtil.getData(phones, page, pageSize, {});

    fs.writeFileSync(path.resolve(__dirname, '../phones.json'), JSON.stringify(result), {
      flag: 'w',
      encoding: 'utf-8',
      mode: '0666'
    });

    ctx.body = {
      result: 'success'
    };

    next();
  })
  .post('/getphone', async (ctx, next) => {
    let phone = ctx.request.body.phone || '';

    if (phone.length < 7) {
      ctx.body = {};
    } else {
      let phone_prefix = phone.substring(0, 7);
      ctx.body = {
        ...ctx.phones[phone_prefix]
      };
    }

    next();
  });

module.exports = router.routes();
