
const db= require('../db')
module.exports = async (log,email,publicIP)=>{
      // const time = current_timestamp();
       await db.query(`INSERT INTO logs(log,timeOfCreation,Email,publicIP) VALUES(?,current_timestamp(),?,?)`, [log, email, publicIP],(err, result)=>{

        if(err){
          console.log(err);
          } 
        else  console.log(result);
   })
}