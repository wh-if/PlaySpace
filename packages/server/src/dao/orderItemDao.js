const { select, insert, update, remove, query } = require("./index");

class OrderItemDao {
  TABLE_NAME = 'order_item';
  get = async (whereValues, one = true) => {
    // const results = await select(this.TABLE_NAME, whereValues);
    return new Promise((resolve, reject) => {
      query(`select \`${this.TABLE_NAME}\`.id as id, productId, activeOption, buyCount, buyOptions, poster, \`name\` as productName from \`${this.TABLE_NAME}\`, product where orderId = ${whereValues.orderId} and product.id = productId
    `, (error, result, field) => {
        if (error) throw error;
        result.forEach(item => {
          item.poster = JSON.parse(item.poster);
          item.buyOptions = JSON.parse(item.buyOptions);
        })
        resolve(result);
      })
    })
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
