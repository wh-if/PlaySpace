const { select, insert, update, remove, query } = require("./index");

class ProductDao {
  TABLE_NAME = 'product';
  get = async (whereValues, one = true) => {
    let results;
    if (whereValues?.searchKeyWord) {
      results = await new Promise((resolve, reject) => {
        query(`select * from ${this.TABLE_NAME} where \`name\` like \'%${whereValues.searchKeyWord}%\' or description like \'%${whereValues.searchKeyWord}%\'`, (error, res) => {
          if (error) {
            throw error;
          }
          resolve(res)
        })
      })
    } else {
      results = await select(this.TABLE_NAME, whereValues);
    }

    results.forEach(item => {
      item.tag = JSON.parse(item.tag);
      item.content = JSON.parse(item.content);
      item.poster = JSON.parse(item.poster);
      item.buyOptions = JSON.parse(item.buyOptions);
    })
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
module.exports = new ProductDao();
