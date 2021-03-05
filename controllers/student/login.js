const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db");

const refreshToken = require("../../utils/refreshToken");
const { validateStudent } = require("../../middleWares/validation");
const logger = require("../../utils/logger");

const login = async (req, res) => {
    //Acquiring email and passwords from body
    const email = req.body.email;
    const password = req.body.password;
    const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

    //INPUT DATA VALIDATION
    const validation = validateStudent(req);
    if (validation.error) {
      console.log('Invalid credentials',validation.error.details[0].message)
      return res
        .status(400)
        .send({ status: false, message: validation.error.details[0].message });
    }

    //SQL Query
    db.query(
      `SELECT * FROM ALL_USER WHERE Email = ? `,
      [email],
      async function (err, results) {
        if (err) {
          console.log(err);
          res.send({
            status: false,
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
              `UPDATE ALL_USER SET Token = ? WHERE Email = ?`,
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
              logger("user logged in", email, ip);
              res.send({
                status,
                token,
                email: results[0].Email,
              });
            } else {
              res.send({
                status,
                message,
              });
            }
          } else {
            console.log("Student not found");
            res.status(400).send({
              status: false,
              message: "Student not found",
            });
          }
        }
      }
    );
  }

  module.exports = login;