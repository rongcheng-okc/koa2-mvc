/**
 * 1.此处建立一个依赖于 koa-static 的静态服务器
 * 2.支持路由
 */

const path = require('path');
const Koa = require('koa');
const static = require('koa-static');
const app = new Koa();
const port = 3001;
const logMiddleWare = require('./utils/logMiddleware');

app.use(logMiddleWare); // 被 koa-static 捕获的资源不会再执行 next，所以为了打印所有请求的日志，需要将日志中间件放在最前面
app.use(static(path.join(__dirname, './public')));

app.use(async (ctx, next) => {
  const url = ctx.url;
  if (url === '/200') {
    ctx.status = 200;
    ctx.body = 'hello world';
  } else if (url === '/404') {
    ctx.status = 404;
    await next();
  } else if (url === '/500') {
    ctx.status = 500;
    await next();
  }
});

app.use(async (ctx, next) => {
  const status = ctx.status;
  if (status === 404) {
    ctx.body = '咦 404';
  } else if (status === 500) {
    ctx.body = '卧槽 500';
  }
});

app.listen(port);
console.log(`app started at port ${port}`);