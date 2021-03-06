const bcrypt = require("bcryptjs");
const db = require("../../db");
const { validateStudent } = require("../../middleWares/validation");
const { WelcomeEmail } = require("../../utils/email");
const logger = require("../../utils/logger");

const register = async (req, res) => {
    //Requiring email and password from body
    const email = req.body.email;
    const password = req.body.password;
    const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

    //INPUT DATA VALIDATION
    const validation = validateStudent(req);
    if (validation.error) {
      console.log('invalid credentials',validation.error.details[0].message)
      return res
        .status(400)
        .send({ status: false, message: validation.error.details[0].message });
    }

    //Hashing the password
    const hashedPassword = await bcrypt.hash(password, 12);

    //SQL query
    db.query(
      `INSERT INTO ALL_USER (Email, Password) VALUES(?,?)`,
      [email, hashedPassword],
      function (err, results) {
        //Registration failed
        if (err) {
          console.log(err);
          res.send({
            status: false,
            message: err.sqlMessage,
          });
        }
        //Registration success
        else {
          console.log(results);
          //log to db
          WelcomeEmail(email,email)
          logger("new user registered", email, ip);
          res.send({
            status: true,
            message: "Successfully registered",
          });
        }
      }
    );
  }

  module.exports = register;