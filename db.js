const mysql= require('mysql')

let pool = mysql.createPool({
    host:process.env.MYSQL_DB_ENDPOINT,
    ssl:true,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:"TapPortal"
})

pool.getConnection((err,connection)=>{
    if(err){
        console.log(err);
    } else console.log("Connected");
    if(connection) connection.release();
    return;
});


module.exports=pool;