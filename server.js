const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const static = require('koa-static')

const app = new Koa();

app.use(static(path.join(__dirname, './public')));

// app.use(async (ctx, next) => {
//     ctx.response.body = getHtml();
// });

// function getHtml() {
//     return fs.readFileSync(path.join(__dirname, './public/index.html'), 'utf-8');
// }

app.use(async (ctx, next) => {
    if (ctx.request.path === '/sync') {
        ctx.response.body = 'index page';
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    console.log(ctx);
    await next();
});

app.use(async (ctx, next) => {
    if (ctx.response.status === 404) {
        await getHtml().then(data => {
            ctx.response.body = data;
        }).catch(error => {
            console.log(error);
        });
    }
});

async function getHtml() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, './public/index.html'), 'utf-8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');