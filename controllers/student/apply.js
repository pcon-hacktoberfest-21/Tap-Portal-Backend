const jwt = require("jsonwebtoken");
const db = require("../../db");
const logger = require("../../utils/logger");

const apply = async (req,res) => {
    //Acquiring Company_id
    const Company_id = req.body.Company_id;

    //Acquiring token from header
    const authHeader = req.get("Authorization");
    const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

    //checking if token exists in header
    if (!authHeader) return res.status(400).send({ message: "can't logout" });
    console.log(authHeader);

    //checking if token is expired or altered
    let decodedToken;
    try {
      decodedToken = await jwt.verify(authHeader, process.env.TOKEN_SECRET);
    } catch (error) {
      if (error) return res.status(400).send({ message: "can't logout" });
    }
  
    const email = decodedToken.Email;

      //Get CGPA AND BRANCH FOR CHECKING ELEGIBILITY 
    db.query(
      `SELECT Cgpa,Branch,RegNo FROM STUDENT WHERE Email = ? `,
      [email],
      async function (err, results) {
        console.log(results);
        if (err) {
          console.log(err);
          res.status(500).send({
            status: false,
            message: "Something went wrong",
          });
        } else {
          let status = true,
          message;
          const cgpa = results.Cgpa;
          const branch = results.Branch;
          const RegNo = results.RegNo;

          //CHECKING ELIGIBLITY FOR CGPA
          db.query(
            `SELECT Min_CGPA FROM COMPANIES WHERE Id = ? `,
            [Company_id],
            async function (err, results) {
              console.log(results);
              if (err) {
                console.log(err);
                res.status(500).send({
                  status: false,
                  message: "Something went wrong",
                });
              } else {
                let status = true,
                message;
                const minCgpa = results.Min_CGPA;
                if(minCgpa<=cgpa){

                  //CHECKING ELIGIBLITY FOR BRANCH
                  db.query(
                    `SELECT Branch FROM ELIGIBLE_BRANCHES WHERE Company_Id = ? `,
                    [Company_id],
                    async function (err, results) {
                      console.log(results);
                      if (err) {
                        console.log(err);
                        res.status(500).send({
                          status: false,
                          message: "Something went wrong",
                        });
                      } else {
                        let status = true,
                        message;
                        var r=0;
                       for(var i=0;i<results.length();i++){
                         if(results[i].Branch == branch){
                           r++;
                           break;
                         }
                       }
                       if(r==1){
                         const Status="Applied";

                         //INSERTING APPLICATION INTO DB
                         db.query(
                          `INSERT INTO APPLICATION (COMPANY_ID, RegNo,Status) VALUES(?,?)`,
                          [Company_id, RegNo,Status],
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
                              logger("new application accepted", email, ip);
                              res.send({
                                status: true,
                                message: "Successfully Applied",
                              });
                            }
                          }
                         );
                       }
                       else{
                        console.log("Not Eligible");
                        res.status(500).send({
                          status: false,
                          message: "Not Eligible",
                        });
                       }
                      }
                    }
                  );
                }else{
                  console.log("Not Eligible");
                  status = false;
                  message = "Not Eligible";
                }
              }
            }
          );
        }
      }
    );
  }

  module.exports = apply;