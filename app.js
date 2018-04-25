/*
 * @Author: Lienren 
 * @Date: 2018-04-08 17:24:08 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-23 16:56:25
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const koa = require('koa');
const koastatic = require('koa-static');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');

const sys_config = require('./configs/sys_config');
const db = require('./configs/db');

const app = new koa();

// 加载大JSON
fs.readFile(path.join(__dirname, 'phones.json'), (error, data) => {
  app.context.phones = JSON.parse(data);
});

// let str_phones = fs.readFileSync(path.join(__dirname, 'phones.json'), 'utf-8');
// app.context.phones = JSON.parse(str_phones);

// 静态存放地址
const staticPath = './static';
app.use(koastatic(path.join(__dirname, staticPath)));

// 配置跨域访问
app.use(cors());

// 使用koa-bodyparser中间件
app.use(
  bodyParser({
    enableTypes: ['json', 'form']
  })
);

// 使用koa-orm中间件，sequelize
const orm = require('koa-orm')(db);
app.use(orm.middleware);

// 全局返回处理
const after_handle = require('./filters/after_handle');
app.use(after_handle);

// 路由
const demo = require('./routers/demo');
const oauth = require('./routers/oauth');
app.use(demo);
app.use(oauth);

// 绑定访问端口
http.createServer(app.callback()).listen(sys_config.port);
