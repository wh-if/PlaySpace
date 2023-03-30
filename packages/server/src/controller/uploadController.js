// router.post('/upload', (ctx) => {
//   console.log(ctx.request.files);
//   ctx.body = 'upload success';

const { HttpMethodEnum } = require("koa-body");

// });
module.exports = [
  {
    path: "/upload",
    method: HttpMethodEnum.POST,
    handler: (ctx => {
      ctx.body = ctx.request;
    })
  }
]