const { HttpMethodEnum } = require("koa-body");
const { getUser } = require("../dao/userDao");

module.exports = [
  // 获取用户列表
  {
    path: "/user",
    method: HttpMethodEnum.GET,
    handler: async (ctx) => {
      ctx.body = await getUser({ id: 1 });
    },
  },
]