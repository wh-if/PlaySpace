const Koa = require("koa");
const koaStatic = require("koa-static");
const { koaBody } = require("koa-body");
const router = require("./controller/router");
const app = new Koa();

app.use(koaBody());
app.use(koaStatic(__dirname + '/public'));
app.use(router.routes());
app.use(router.allowedMethods());

// 跨域
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Allow-Methods', '*');
//   ctx.set('Access-Control-Allow-Headers', 'content-type');
//   await next();
// });

app.listen(8080, () => {
  console.log("server is running at http://localhost:8080");
});

