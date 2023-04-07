const { HttpMethodEnum: { GET, POST, DELETE, PUT } } = require("koa-body");
const AjaxResult = require("../util/AjaxResult");
const orderDao = require("../dao/orderDao")
const orderItemDao = require("../dao/orderItemDao")
const productDao = require("../dao/productDao")


module.exports = [
  // 获取用户订单列表 /order?userId=xx orderId=xx
  {
    path: "/order",
    method: GET,
    handler: async (ctx) => {
      const { userId, orderId } = ctx.query;
      let result
      if (!!orderId) {
        result = await orderDao.get({ id: orderId });
        result.productItems = await orderItemDao.get({ orderId }, false);
        result.productItems.forEach(item => {
          item.productPicture = item.poster[0];
        })
      } else {
        result = await orderDao.get({ userId }, false);
        for (const iterator of result) {
          const productItems = await orderItemDao.get({ orderId: iterator.id }, false);
          iterator.productPictures = productItems.map(i => i.poster[0]);
          iterator.totalPrice = productItems.reduce((pre, cur) => pre + cur.buyOptions[cur.activeOption].discountPrice * cur.buyCount, 0)
        }
      }

      ctx.body = AjaxResult.success(result);
    },
  },
  // 
  {
    path: "/order",
    method: POST,
    handler: async (ctx) => {
      const { userId, addressId, productItems } = ctx.request.body;
      // gen orderNumber  createTime status payTime
      const newOrder = {
        userId,
        addressId,
        createTime: Date.now(),
        status: 0,
        orderNumber: Date.now().toString(24) + Math.random().toString(24).slice(2)
      }

      const resultId = await orderDao.add(newOrder);
      // add orderitem
      productItems.forEach(async item => {
        const newOrderItem = {
          orderId: resultId,
          productId: item.productId,
          activeOption: item.activeOption,
          buyCount: item.buyCount
        }
        await orderItemDao.add(newOrderItem);
      })


      // if (result) {
      ctx.body = AjaxResult.success({ orderId: resultId });
      // } else {
      //   ctx.body = AjaxResult.error();
      // }
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
  {
    path: "/order/pay/:id",
    method: PUT,
    handler: async (ctx) => {
      const { payFinish } = ctx.request.body;
      if (payFinish) {
        const result = await orderDao.update({ status: 1, payTime: Date.now() }, { id: ctx.params.id });
        ctx.body = AjaxResult.success();
        return;
      }
      ctx.body = AjaxResult.error();

    },
  },
]