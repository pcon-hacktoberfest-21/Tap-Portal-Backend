const db = require("../../db");
const isEligible = require("../../utils/isEligible");
const logger = require("../../utils/logger");

const apply = async (req,res) => {
  
    //Acquiring Company_id
    const Company_id = req.body.companyId;
    const regNo = req.body.regNo;
    const email = req.body.email;

    //Get CGPA AND BRANCH FOR CHECKING ELEGIBILITY 
    const eligible = isEligible(email, 1, Company_id);
    if(eligible.status){
      db.query(
        `INSERT INTO APPLICATION (COMPANY_ID, RegNo,Status) VALUES(?,?)`,
        [Company_id, regNo,'Applied'],
        function (err, results) {
          //Application failed
          if (err) {
            console.log(err);
            res.send({
              status: false,
              message: err.sqlMessage,
            });
          }
          //Application success
          else {
            console.log(results);
            //log to db
            logger("new application accepted", email, req.header("x-forwarded-for") || req.connection.remoteAddress);
            res.send({
              status: true,
              message: "Successfully Applied",
            });
          }
        }
      );  
    }
    else{
      res.send({
        status: true,
        message: eligible.message,
      })
    }
    
  }

  module.exports = apply;