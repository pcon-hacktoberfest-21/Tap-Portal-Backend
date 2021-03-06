const db = require("../../db");
const jwt = require("jsonwebtoken");
const { resetPasswordEmail } = require("../../utils/email");

module.exports = async (req, res) => {
  const email = req.body.email; /*2019ugcs001@nitjsr.ac.in*/
  if (!email) return res.status(400).send({ message: "email is required" });
  //SQL Query
  await db.query(
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
        //user exists
        if (results.length > 0) {
          //generate reset link
          const token = jwt.sign(
            {
              Email: email,
            },
            process.env.PASSWORD_RESET_TOKEN_SECRET,
            { expiresIn: "20m" }
          );
          //getting url for sending to front end
          const URL = req.protocol + "://" + req.get("host");
          const link = URL + "/admin/reset-password/" + token;
          console.log(link);
          //email the generated link
          try {
            // resetPasswordEmail(email, link);
            res.send({
              status: true,
              message: "Password reset link has been sent to your email",
            });
          } catch (error) {
            res.status(500).send(error);
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
