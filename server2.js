const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const static = require('koa-static');
const Router = require('koa-router');
const logMiddleware = require('./utils/logMiddleware');
const { syncGetHtml, asyncGetHtml, } = require('./utils/getFile');
const { api1, } = require('./service/service');

const app = new Koa();
const port = 3002;

app.use(logMiddleware);
app.use(static(path.join(__dirname, './public')));

let page = new Router();
let pageChildren = new Router();

pageChildren.get('/1', async (ctx) => {
  ctx.body = 'PAGE => 1';
});

pageChildren.get('/sync', async (ctx) => {
  ctx.body = syncGetHtml(path.join(__dirname, './public/index.html'));
});

pageChildren.get('/async', async (ctx) => {
  ctx.body = await asyncGetHtml(path.join(__dirname, './public/index.html'));
});

page.use('/page', pageChildren.routes(), pageChildren.allowedMethods());

page.post('/api/getUserById', async (ctx, next) => {
  await api1().then(data => {
    ctx.body = data;
  });
  await next();
});
app.use(page.routes(), page.allowedMethods());

app.use(async ctx => {
  console.log('试验洋葱模型');
});

app.listen(port);
console.log(`app started at port ${port}`);