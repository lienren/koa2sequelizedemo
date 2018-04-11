/*
 * @Author: Lienren 
 * @Date: 2018-04-08 17:24:08 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-10 17:09:38
 */
'use strict';

const http = require('http');
const path = require('path');
const koa = require('koa');
const koastatic = require('koa-static');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');

const sys_config = require('./configs/sys_config');
const db = require('./configs/db');

const app = new koa();

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

// 全局请求处理
const before_handle = require('./filters/before_handle');
app.use(before_handle);

// 路由
const oauth = require('./routers/oauth');
app.use(oauth);

// 全局返回处理
const after_handle = require('./filters/after_handle');
app.use(after_handle);

// 绑定访问端口
http.createServer(app.callback()).listen(sys_config.port);
