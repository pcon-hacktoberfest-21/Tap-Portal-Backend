const db = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../../utils/logger");
module.exports = async (req, res) => {
  //Acquiring token from header
  const token = req.get("Authorization");
  const password = req.body.password;
  if (!password)
    return res.status(400).send({ message: "password is required" });

  let email;
  //check token
  try {
    let decodedToken = await jwt.verify(
      token,
      process.env.PASSWORD_RESET_TOKEN_SECRET
    );
    email = decodedToken.Email;
  } catch (error) {
    if (error)
      return res.status(403).send({ message: "resource not avilable" });
  }
  //Hashing the password
  const hashedPassword = await bcrypt.hash(password, 12);
  //get ip for logger
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  //SQL query
  db.query(
    `UPDATE ADMIN 
    SET Password =? 
    WHERE Email = ?`,
    [hashedPassword, email],
    function (err, results) {
      if (err) {
        if (err.sqlMessage) {
          res.status(400).send({
            status: false,
            message: err.sqlMessage,
          });
        } else {
          res.status(500).send({
            status: false,
            message: "Something went wrong",
          });
        }
      } else {
        res.send({ message: "Password Updated Successfully " });
        //log to db
        logger("Password Updated", email, ip);
      }
    }
  );
};
