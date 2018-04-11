/*
 * @Author: Lienren 
 * @Date: 2018-04-10 16:52:53 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-10 20:11:16
 */
'use strict';

async function save_db_log(ctx, next) {
  let result = await ctx.orm().base_logs.create({
    url: ctx.work.url,
    param: JSON.stringify(ctx.work.param),
    body: JSON.stringify(ctx.work.request_result),
    urlname: ctx.work.api.urlname,
    opname: ctx.work.admin.realname || '',
    requesttime: ctx.work.before_time,
    returntime: ctx.work.after_time,
    taketime: ctx.work.after_time - ctx.work.before_time
  });

  console.log('result:', result);

  return result;
}

module.exports = async function(ctx, next) {
  await save_db_log(ctx, next);
};
