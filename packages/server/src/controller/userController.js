const { HttpMethodEnum: { GET, POST } } = require("koa-body");
const { get } = require("../dao/userDao");
const AjaxResult = require("../util/AjaxResult");

module.exports = [
  // 获取用户列表
  {
    path: "/user",
    method: GET,
    handler: async (ctx) => {
      ctx.body = await get({ id: 1 });
    },
  },
  // 登录
  {
    path: "/login",
    method: POST,
    handler: async (ctx) => {
      const { accountNumber, password } = ctx.request.body;
      const user = await get({ accountNumber });
      if (password === user.password) {
        ctx.body = AjaxResult.success("登录成功！", null)
      } else {
        ctx.body = AjaxResult.error("用户名或密码错误！")
      }
    },
  },
  // 注册
  {
    path: "/register",
    method: POST,
    handler: async (ctx) => {
      ctx.body = ctx.is('multipart')
    },
  },
]