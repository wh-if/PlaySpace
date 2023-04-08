const Koa = require("koa");
// const koaStatic = require("koa-static");
const { koaBody } = require("koa-body");
const router = require("./controller/router");
const { auth } = require("./middleware/auth");
const app = new Koa();

app.use(auth());
app.use(koaBody());

// 跨域
// app.use(async (ctx, next) => {
//   await next();
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Allow-Methods', '*');
//   ctx.set('Access-Control-Allow-Headers', 'content-type');
  
// });


app.use(router.routes());
app.use(router.allowedMethods());


app.listen(8080, () => {
  console.log("server is running at http://localhost:8080");
});

