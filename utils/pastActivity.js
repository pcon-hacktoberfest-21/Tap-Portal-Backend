const db = require("../db");
module.exports = async (res, email, isAdmin) => {
  let table = "USER_LOGGER";
  if (isAdmin === "admin") {
    table = "ADMIN_LOGGER";
  }

  await db.query(
    `SELECT * FROM ${table} WHERE Email = ? ORDER BY Id DESC LIMIT 5`,
    email,
    (err, results) => {
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
        res.send({ ...results });
      }
    }
  );
};
