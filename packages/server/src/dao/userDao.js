const { select, insert, update, remove } = require("./index");

class UserDao {
  TABLE_NAME = 'user';
  getUser = async (whereValues, one = true) => {
    const results = await select(this.TABLE_NAME, whereValues);
    return one ? results[0] : results;
  };
  updateUser = (updateValues, whereValues) => {
    return update(this.TABLE_NAME, updateValues, whereValues);
  };
  addUser = (objData) => {
    return insert(this.TABLE_NAME, objData);
  };
  deleteUser = (whereValues) => {
    return remove(this.TABLE_NAME, whereValues)
  };
}
module.exports = new UserDao();
// update('user',{id:2,name:'fafa',accountNumber:'1232333',email:'1',password:'123'},{id:2})