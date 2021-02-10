const jwt = require("jsonwebtoken");
const db = require("../../db");
const { validateBranchDetails } = require("../../middleWares/validation");


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

//Validate Branch
const validation = validateBranchDetails({branch: [req.params.branch]});
  if (validation.error) {
    return res
      .status(400)
      .send({ status: false, message: validation.error.details[0].message });
  }
  //Getting companies from db
  //SQL Query

      
db.query( `SELECT Company_Id FROM ELIGIBLE_BRANCHES WHERE Branch =?`
  ,[req.params.branch],(err,results)=>{
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
        db.query(`SELECT Name FROM COMPANIES WHERE ID IN (${results.map(
            result=>result.Company_Id
            ).join(',')})`,(err,results)=>{
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
                const companiesList = results.map(result=>result.Name).join(',');
                res.send({Companies:companiesList});
        }})

    }})}
 