const jwt = require("jsonwebtoken");
const db = require("../../db");
const logger = require("../../utils/logger");
const { validateUpdateCompany } = require("../../middleWares/validation");


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

//Validate Admin Details
const validation = validateUpdateCompany(req);
if (validation.error) {
  return res
    .status(400)
    .send({ status: false, message: validation.error.details[0].message });
}
//SQL query 
db.query(
    `UPDATE COMPANIES SET Name =? ,CGPA = ? WHERE Id = ?`,
    [req.body.name, req.body.cgpa, req.params.id],
    function (err, results) {
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
        //log to db
        logger(`Company Updated with Id = ${req.params.id} Name = ${req.body.name}`, email, ip);
        res.send({
          message: "Company Updated Successfully ",
        });
      }
    }
  );
}
 



   
  