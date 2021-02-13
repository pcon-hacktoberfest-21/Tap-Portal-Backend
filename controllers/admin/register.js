const bcrypt = require("bcryptjs");
const db = require("../../db");
const { validateAdmin } = require("../../middleWares/validation");
const logger = require("../../utils/logger");

module.exports = async (req, res) => {
  //Acquiring data from body
  const name = req.body.name; /*aman jha*/
  const email = req.body.email; /*2019ugcs001@nitjsr.ac.in*/
  const password = req.body.password; /*'password'*/
  const branch = req.body.branch; /*'cse'*/
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  //INPUT DATA VALIDATION
  const validation = validateAdmin(req);
  if (validation.error) {
    return res
      .status(400)
      .send({ status: false, message: validation.error.details[0].message });
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
        res.status(400).send({
          message: err.sqlMessage,
        });
      } else {
        console.log(results);
        //log to db
        logger("new admin registered", email, ip);
        res.send({
          message: "Successfully registered",
        });
      }
    }
  );
};
