const { select, insert, update, remove } = require("./index");

class AddressDao {
  TABLE_NAME = 'address';
  get = async (whereValues, one = true) => {
    const results = await select(this.TABLE_NAME, whereValues);
    results.forEach(item => {
      item.isDefault = Boolean(parseInt(item.isDefault))
    })
    return one ? results[0] : results;
  };
  update = (updateValues, whereValues) => {
    if (updateValues.isDefault) {
      update(this.TABLE_NAME, { isDefault: false }, { isDefault: '1' });
    }
    return update(this.TABLE_NAME, updateValues, whereValues);
  };
  add = (objData) => {
    return insert(this.TABLE_NAME, objData);
  };
  remove = (whereValues) => {
    return remove(this.TABLE_NAME, whereValues)
  };
}
module.exports = new AddressDao();
