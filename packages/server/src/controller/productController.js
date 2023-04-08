const { HttpMethodEnum: { GET, POST } } = require("koa-body");
const productDao = require("../dao/productDao");
const categoryDao = require("../dao/categoryDao");
const AjaxResult = require("../util/AjaxResult");

module.exports = [
  // 获取列表 /product?categoryId=xx
  {
    path: "/product",
    method: GET,
    handler: async (ctx) => {
      const { categoryId, productId } = ctx.query;
      if (!!productId) {
        ctx.body = AjaxResult.success(await productDao.get({ id: productId })) ;
      }
      let queryValues = {};
      if (!!categoryId) {
        queryValues.categoryId = categoryId;
      }
      ctx.body = AjaxResult.success(await productDao.get({ categoryId }, false));
    },
  },
  {
    path: "/product/:id",
    method: GET,
    handler: async (ctx) => {
      ctx.body = AjaxResult.success(await productDao.get({ id: ctx.params.id }, false));
    },
  },
  // 登录
  // {
  //   path: "/product",
  //   method: POST,
  //   handler: async (ctx) => {
  //     const { accountNumber, password } = ctx.request.body;
  //     const user = await productDao.get({ accountNumber });
  //     if (password === user.password) {
  //       ctx.body = AjaxResult.success("登录成功！", null)
  //     } else {
  //       ctx.body = AjaxResult.error("用户名或密码错误！")
  //     }
  //   },
  // },
  // 获取列表
  {
    path: "/category",
    method: GET,
    handler: async (ctx) => {
      const list = await categoryDao.get({}, false);
      const resultList = list.filter(item => item.superId === 0);
      list.forEach(item => {

        const resultItem = resultList.find(i => i.id === item.superId);
        if (!!resultItem) {
          if (Array.isArray(resultItem.children)) {
            resultItem.children.push(item)
          } else {
            resultItem.children = [item]
          }

        }

      });
      ctx.body = resultList;
    },
  },
]