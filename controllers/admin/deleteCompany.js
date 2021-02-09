const jwt = require("jsonwebtoken");
const db = require("../../db");
const logger = require("../../utils/logger");


module.exports = async (req, res) => {
  //Acquiring token from header
  const authHeader = req.get("Authorization");
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  //checking if token exists in header
  if (!authHeader) return res.status(403).send({ message: "resource not avilable" });
  console.log(authHeader);

  //checking if token is expired or altered
  let decodedToken;
  try {
    decodedToken = await jwt.verify(authHeader, process.env.TOKEN_SECRET);
  } catch (error) {
    if (error) return res.status(403).send({ message: "resource not avilable" });
  }

  const email = decodedToken.Email;

  //Getting companies from db
  //SQL Query

      
db.query( `DELETE FROM COMPANIES WHERE Id =? `,[req.params.id]
  ,(err,results)=>{
    if (err) {
      if(err.sqlMessage){
      res.status(400).send({
          status:false,
        message: err.sqlMessage,
      })}else{res.status(500).send({
        status: false,
        message: "Something went wrong",
      })}
    }  else {
        if(results.affectedRows === 0) return res.status(400).send({message: "no company found"})
        //log to db
        logger(`${results.affectedRows} Company deleted with Id = ${req.params.id}`, email, ip);
        console.log(results)
res.send({ message: results.affectedRows+" Company Removed Successfully"});
    }})}
 



   
  