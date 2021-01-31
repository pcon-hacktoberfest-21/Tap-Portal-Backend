const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const refreshToken = require("../utils/refreshToken");
const { validateAdmin, validateLogin } = require("../middleWares/validation");

module.exports = {
  //Login ADMIN
  login: async (req, res) => {
    //Acquiring data from body
    const email = req.body.email; /*2019ugcs001@nitjsr.ac.in*/
    const password = req.body.password; /*'password'*/

     //INPUT DATA VALIDATION
     const validation = validateLogin(req);
     if (validation.error) {
       return res.status(400).send(validation.error.details[0].message);
     }

    //SQL Query
    db.query(
      `SELECT * FROM ADMIN WHERE Email = ? `,
      [email],
      async function (err, results) {
        if (err) {
          console.log(err);
          res.send({
            message: "Something went wrong",
          });
        } else {
          let status = true,
            message;
          //USER is found
          if (results.length > 0) {
            const isEqual = await bcrypt.compare(password, results[0].Password);
            if (!isEqual) {
              //Incorrect Password
              console.log("Incorrect Password");
              status = false;
              message = "Incorrect Password";
            }
            let token;

            //If token is not there then providing a new token
            if (results[0].Token == null) {
              token = jwt.sign(
                {
                  Email: results[0].Email,
                },
                process.env.TOKEN_SECRET,
                { expiresIn: "1h" }
              );
            }

            //If token is already there then checking for its expiry
            //If expired providing him/ her new token
            //Else returing the same token
            else {
              token = refreshToken(results[0].Token, results[0].Email);
            }

            console.log(token);

            //Saving the token in database
            db.query(
              `UPDATE ADMIN SET Token = ? WHERE Email = ?`,
              [token, email],
              function (err, results) {
                if (err) {
                  console.log(err);
                  status = false;
                  message = "Something went wrong";
                } else {
                  console.log(results);
                }
              }
            );

            if (status) {
              res.send({
                token: token,
                tokenExpiration: 1,
                email: results[0].Email,
              });
            } else {
              res.send({
                message,
              });
            }
          } else {
            console.log("Student not found");
            res.send({
              message: "Student not found",
            });
          }
        }
      }
    );
  },

  // Register USERS
  register: async (req, res) => {
   //Acquiring data from body
   const name = req.body.name; /*aman jha*/
   const email = req.body.email; /*2019ugcs001@nitjsr.ac.in*/
   const password = req.body.password; /*'password'*/
   const branch = req.body.branch; /*'cse'*/
    
    //INPUT DATA VALIDATION
    const validation = validateAdmin(req);
    if (validation.error) {
      return res.status(400).send(validation.error.details[0].message);
    }

    //Hashing the password
    const hashedPassword = await bcrypt.hash(password, 12);

    //SQL query
    db.query(
      `INSERT INTO ADMIN (Name, Email, Password, Branch) VALUES(?,?,?,?)`,
      [name, email, hashedPassword, branch],
      function (err, results) {
        if (err) {
          console.log(err);
          res.send({
            message: err.sqlMessage,
          });
        } else {
          console.log(results);
          res.send({
            message: "Successfully registered",
          });
        }
      }
    );
  },

  //Logout USERS
  logout: async (email) => {
    // Deleting the jwt token from database
    db.query(
      `UPDATE ADMIN SET Token = NULL WHERE Email = ?`,
      [email],
      function (err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
        }
      }
    );
  },
};
