const Router = require("koa-router");
const router = new Router();
const fs = require("fs");

fs.readdir(__dirname, (_, files) => {
  files.forEach(file => {
    if (/(.*)(?=Controller.js)/g.test(file)) {
      const fileController = require(`./${file}`);
      fileController.forEach(item => {
        router.register(item.path, [item.method], item.handler);
      });
    }
  })
})

module.exports = router;