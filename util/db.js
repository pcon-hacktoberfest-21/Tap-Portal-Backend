const mysql = require('mysql');

let con = mysql.createPool({
  host: process.env.MYSQL_DB_ENDPOINT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
  });
  con.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected to db");
     });
 

  module.exports = con;
