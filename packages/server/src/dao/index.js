const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 5,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'vshop'
});

exports.query = pool.query.bind(pool);

exports.select = (tableName, whereValues) => {
  return new Promise((resolve, reject) => {
    let sql = warpWhere(`select * from \`${tableName}\``, whereValues);
    console.warn(sql);
    pool.query(sql, function (error, results, fields) {
      if (error) throw error; 
      resolve(results);
    });
  })
}

exports.insert = (tableName, obj) => {
  return new Promise((resolve, reject) => {
    pool.query(`insert into \`${tableName}\` set ?`, obj, function (error, results, fields) {
      if (error) throw error;
      resolve(results.insertId);
    });
  })
}

exports.update = (tableName, updateValues, whereValues) => {
  return new Promise((resolve, reject) => {
    let sqlBuilder = `update \`${tableName}\` set `;
    for (const key in updateValues) {
      if (Object.hasOwnProperty.call(updateValues, key)) {
        sqlBuilder += `${'`' + key + '`'}=${ mysql.escape(updateValues[key])},`;
      }
    }
    sqlBuilder = sqlBuilder.substring(0, sqlBuilder.length - 1);
    
    const sql = warpWhere(sqlBuilder, whereValues);
    console.log(sql);
    pool.query(sql, function (error, results, fields) {
      if (error) throw error;
      resolve(results.changedRows);
    });
  })
}

exports.remove = (tableName, whereValues) => {
  return new Promise((resolve, reject) => {
    let sql = warpWhere(`delete from \`${tableName}\``, whereValues);
    console.warn(sql);
    pool.query(sql, function (error, results, fields) {
      if (error) throw error;
      resolve(results.affectedRows);
    });
  })
}

function warpWhere(sql, values) {
  if (!values) {
    return sql;
  }
  let isFirstValue = true;
  for (const key in values) {
    if (Object.hasOwnProperty.call(values, key)) {
      if (values[key]) {
        if (isFirstValue) {
          sql += " where";
          isFirstValue = false;
        } else {
          sql += " and";
        }
        sql += ` ${'`' + key + '`'} = ${mysql.escape(values[key])}`;
      }
    }
  }
  return sql;
}