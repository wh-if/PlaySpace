const { select, insert, update, remove } = require("./index");

class CategoryDao {
  TABLE_NAME = 'category';
  get = async (whereValues, one = true) => {
    const results = await select(this.TABLE_NAME, whereValues);
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
module.exports = new CategoryDao();
