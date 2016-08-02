var mysql = require('mysql');
var pool = mysql.createPool({
  host  : '52.35.2.29',
  user  : 'student',
  password: 'default',
  database: 'student'
});

module.exports.pool = pool;