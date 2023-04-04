const { select, insert, update, remove } = require("./index");

class OrderItemDao {
  TABLE_NAME = 'order-item';
  get = async (whereValues, one = true) => {
    const results = await select(this.TABLE_NAME, whereValues);
    // results.forEach(item => {
    //   item.tag = JSON.parse(item.tag);
    //   item.content = JSON.parse(item.content);
    //   item.poster = JSON.parse(item.poster);
    //   item.buyOptions = JSON.parse(item.buyOptions);
    // })
    return one ? results[0] : results;
  };
  update = (updateValues, whereValues) => {
    return update(this.TABLE_NAME, updateValues, whereValues);
  };
  add = (objData) => {
    return insert(this.TABLE_NAME, objData);
  };
  remove = (whereValues) => {
    return remove(this.TABLE_NAME, whereValues)
  };
}
module.exports = new OrderItemDao();
