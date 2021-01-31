var db= require('../db')
module.exports = async (log,userID,publicIP)=>{
       const comand=`INSERT INTO logs(log,timeOfCreation,userID,publicIP) VALUES ("${log}",current_timestamp(),"${userID}","${publicIP}")`
       await db.query(comand,(err, result)=>{
        if(err){
          console.log(err);
          } 
        else  console.log(result);
   })
}