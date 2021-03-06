const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db");
const refreshToken = require("../../utils/refreshToken");
const { validateLogin } = require("../../middleWares/validation");
const logger = require("../../utils/logger");

module.exports = async (req, res) => {
  //Acquiring data from body
  const email = req.body.email; /*2019ugcs001@nitjsr.ac.in*/
  const password = req.body.password; /*'password'*/
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  //INPUT DATA VALIDATION
  const validation = validateLogin(req);
  if (validation.error) {
    return res
      .status(400)
      .send({ status: false, message: validation.error.details[0].message });
  }

  //SQL Query
  db.query(
    `SELECT * FROM ADMIN WHERE Email = ? `,
    [email],
    async function (err, results) {
      if (err) {
        console.log(err);
        res.status(500).send({
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
          console.log(results[0].Token);
          if (results[0].Token == null) {
            token = jwt.sign(
              {
                Email: results[0].Email,
              },
              process.env.ADMIN_TOKEN_SECRET,
              { expiresIn: "1h" }
            );
          }

          //If token is already there then checking for its expiry
          //If expired providing him/ her new token
          //Else returing the same token
          else {
            token = refreshToken(results[0].Token, results[0].Email, "admin");
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
            //log to db
            logger("admin logged in", email, ip);
            res.send({
              token: token,
              tokenExpiration: 1,
              email: results[0].Email,
            });
            //send email if logged from different ip
          } else {
            res.send({
              message,
            });
          }
        } else {
          console.log("User not found");
          res.status(400).send({
            status: false,
            message: "User not found",
          });
        }
      }
    }
  );
};
