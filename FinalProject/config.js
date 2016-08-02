var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'cs290_wangx2',
  password        : '9846',
  database        : 'cs290_wangx2'
});

module.exports.pool = pool;