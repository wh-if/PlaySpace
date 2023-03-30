const { HttpMethodEnum, koaBody } = require("koa-body");
const path = require('path');
const AjaxResult = require("../util/AjaxResult");

module.exports = [
  // 需要访问权限
  {
    path: "/upload",
    method: HttpMethodEnum.POST,
    handler: [
      koaBody({
        multipart: true,
        formidable: {
          uploadDir: path.join(__dirname, "../upload"),
          keepExtensions: true,
          maxFieldsSize: 2 * 1024 * 1024,
        }
      }),
      ctx => {
        // console.log(ctx.request.files);
        ctx.body = AjaxResult.success();
      }
    ]
  },
  // 公开的，不需要权限访问
  {
    path: "/public",
    method: HttpMethodEnum.POST,
    handler: [
      koaBody({
        multipart: true,
        formidable: {
          uploadDir: path.join(__dirname, "../public"),
          keepExtensions: true,
          maxFieldsSize: 2 * 1024 * 1024,
        }
      }),
      ctx => {
        // console.log(ctx.request.files);
        ctx.body = AjaxResult.success();
      }
    ]
  }
]