const db = require("../../db");
const isEligible = require("../../utils/isEligible");
const logger = require("../../utils/logger");

const apply = async (req,res) => {
  
    //Acquiring Company_id
    const Company_id = req.body.companyId;

    //regNo and email sholud be filled by default
    const regNo = req.student.RegNo;
    const email = req.student.Email;

    //Get CGPA AND BRANCH FOR CHECKING ELEGIBILITY 
    const eligible = await isEligible(email, 1, Company_id,regNo);
    if(eligible.status){
      db.query(
        `INSERT INTO APPLICATION (Email,COMPANY_ID, RegNo,Status) VALUES(?,?,?,?)`,
        [email,Company_id, regNo,'Applied'],
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
            logger("new application accepted", email, req.header("x-forwarded-for") || req.connection.remoteAddress,'user');
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