const mysql= require('mysql')

let pool = mysql.createPool({
    host:process.env.MYSQL_DB_ENDPOINT,
    ssl:true,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

pool.getConnection((err,connection)=>{
    if(err){
        console.log(err);
    } 
    else console.log("Database Connected");

    if(connection) connection.release();
        return;
});

module.exports = pool;


// Table for student
    
// pool.query(`DROP TABLE ALL_USER`, function(err, res){
//     if(err)
//     console.log(err)
//     else
//     console.log(`TAble dropped`)
// })

// pool.query(`CREATE TABLE ALL_USER (Email VARCHAR(50) NOT NULL PRIMARY KEY,Token VARCHAR(255),Password VARCHAR(255))`, function(err, results) {
//     if(err)
//     console.log(err)
//     else
//     console.log(results)
// });
