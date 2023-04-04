const { HttpMethodEnum: { GET, POST, DELETE, PUT } } = require("koa-body");
const AjaxResult = require("../util/AjaxResult");
const orderDao = require("../dao/orderDao")
const orderItemDao = require("../dao/orderItemDao")


module.exports = [
  // 获取用户订单列表 /order?userId=xx
  {
    path: "/order",
    method: GET,
    handler: async (ctx) => {
      const { userId } = ctx.query;
      const resultList = await orderDao.get({ userId });
      ctx.body = AjaxResult.success(resultList);
    },
  },
  // 
  {
    path: "/order",
    method: POST,
    handler: async (ctx) => {
      const result = await orderDao.add(ctx.request.body);
      // add orderitem
      if (result) {
        ctx.body = AjaxResult.success();
      } else {
        ctx.body = AjaxResult.error();
      }
    },
  },
  // 更新 
  {
    path: "/order/:id",
    method: PUT,
    handler: async (ctx) => {
      const result = await orderDao.update(ctx.request.body, { id: ctx.params.id });

      if (result) {
        ctx.body = AjaxResult.success();
      } else {
        ctx.body = AjaxResult.error();
      }
    },
  },
  {
    path: "/order/:id",
    method: DELETE,
    handler: async (ctx) => {
      const result = await orderDao.remove({ id: ctx.params.id });
      // remove orderitem
      if (result) {
        ctx.body = AjaxResult.success();
      } else {
        ctx.body = AjaxResult.error();
      }
    },
  },
]