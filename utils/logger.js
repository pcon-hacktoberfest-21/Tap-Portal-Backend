
const db= require('../db')
module.exports = async (log,email,publicIP,type)=>{
   // const time = current_timestamp();
  //if type is admin then execute if statement or if type is user then execute else statement
  if(type=="admin"){
    await db.query(`INSERT INTO admin_logger(log,timeOfCreation,Email,publicIP) VALUES(?,current_timestamp(),?,?)`, [log, email, publicIP],(err, result)=>{
      if(err){
        console.log(err);
      } 
      else  console.log(result);
    })
  }else{
    await db.query(`INSERT INTO user_logger(log,timeOfCreation,Email,publicIP) VALUES(?,current_timestamp(),?,?)`, [log, email, publicIP],(err, result)=>{
      if(err){
        console.log(err);
      } 
      else  console.log(result);
    })
  }
}