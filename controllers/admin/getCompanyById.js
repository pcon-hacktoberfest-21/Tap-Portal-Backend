const jwt = require("jsonwebtoken");
const db = require("../../db");


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


  //Getting companies from db
  //SQL Query

      
db.query( `SELECT * FROM COMPANIES WHERE Id = ?;SELECT * FROM ELIGIBLE_BRANCHES`,req.params.id
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
        if(results.length === 0) return res.status(400).send(
           { status: false,
        message: "Id doesn't exist",
           });
           results[0].map(result=>{
            result.Branch = `${
              results[1].map(result2=>{if(result2.Company_Id==result.Id){
                return result2.Branch
              }}).filter(Boolean).join(',') || null
            }`;
          })
res.send(results[0]);
// console.log(results);
    }})}
 



   
  