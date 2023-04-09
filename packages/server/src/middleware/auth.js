exports.auth = () => {
  const whiteList = ['/login', '/register','/banner', '/static', '/product', '/category', '/address'];
  return async (ctx, next) => {
    const findIndex = whiteList.findIndex(item => ctx.path.startsWith(item))
    if (findIndex === -1) {
      if (checkToken(ctx.headers.token)) {
        await next()
      } else {
        ctx.body = "token 已过期或不存在, 请重新登录"
      }
    } else {
      await next()
    }
  }
}

function checkToken(token) {
  return token == 'pass'
}