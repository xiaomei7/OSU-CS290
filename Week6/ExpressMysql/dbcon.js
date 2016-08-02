var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : '52.35.2.29',
  user            : 'hellouser',
  password        : 'default',
  database        : 'hellodb'
});

module.exports.pool = pool;