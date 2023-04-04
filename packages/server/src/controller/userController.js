const { HttpMethodEnum: { GET, POST, PUT, DELETE } } = require("koa-body");
const userDao = require("../dao/userDao");
const addressDao = require("../dao/addressDao");
const AjaxResult = require("../util/AjaxResult");

module.exports = [
  // 获取用户列表
  {
    path: "/user",
    method: GET,
    handler: async (ctx) => {
      ctx.body = await userDao.get({ id: 1 });
    },
  },
  // 登录
  {
    path: "/login",
    method: POST,
    handler: async (ctx) => {
      const { accountNumber, password } = ctx.request.body;
      const user = await userDao.get({ accountNumber });
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
  // 获取用户地址列表 /address?userId=xx
  {
    path: "/address",
    method: GET,
    handler: async (ctx) => {
      const { userId } = ctx.query;
      const resultList = await addressDao.get({ userId });
      ctx.body = AjaxResult.success(resultList);
    },
  },
  // 
  {
    path: "/address",
    method: POST,
    handler: async (ctx) => {
      const result = await addressDao.add(ctx.request.body);

      if (result) {
        ctx.body = AjaxResult.success();
      } else {
        ctx.body = AjaxResult.error();
      }
    },
  },
  // 更新 
  {
    path: "/address/:id",
    method: PUT,
    handler: async (ctx) => {
      const result = await addressDao.update(ctx.request.body, { id: ctx.params.id });

      if (result) {
        ctx.body = AjaxResult.success();
      } else {
        ctx.body = AjaxResult.error();
      }
    },
  },
  {
    path: "/address/:id",
    method: DELETE,
    handler: async (ctx) => {
      const result = await addressDao.remove({ id: ctx.params.id });
      if (result) {
        ctx.body = AjaxResult.success();
      } else {
        ctx.body = AjaxResult.error();
      }
    },
  },
]