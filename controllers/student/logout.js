const jwt = require("jsonwebtoken");
const db = require("../../db");

const logger = require("../../utils/logger");

const logout = async (req, res) => {
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

    //check if user is already logged out
    //SQL Query
    db.query(
      `SELECT Token FROM ALL_USER WHERE Email = ? `,
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
          if (results[0].Token == null) {
            return res.status(400).send({ message: "can't logout" });
          }
          //user is logged in and token verified
          // Deleting the jwt token from database
          db.query(
            `UPDATE ALL_USER SET Token = NULL WHERE Email = ?`,
            [email],
            function (err, results) {
              if (err) {
                console.log("logout unsuccessful", err.sqlMessage);
                res.send({
                  status: false,
                  message: err.sqlMessage,
                });
              } else {
                console.log("logged you out");
                logger("user logged out", email, ip);
                res.send({
                  status: true,
                  message: "Successfully logged you out",
                });
              }
            }
          );
        }
      }
    )
  }

  module.exports = logout;