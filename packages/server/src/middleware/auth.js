const jwt = require('jsonwebtoken');
const AjaxResult = require('../util/AjaxResult');

exports.auth = () => {
  const whiteList = ['/login', '/register', 'banner', '/static', '/product', '/category', '/address'];
  return async (ctx, next) => {
    const findIndex = whiteList.findIndex(item => ctx.path.startsWith(item))
    if (findIndex === -1) {
      try {
        const decoded = jwt.verify(ctx.headers.token, 'vshop');
      } catch (error) {
        ctx.body = AjaxResult.error("token 已过期或不存在, 请重新登录");
        return;
      }
    }
    await next()

  }
}
