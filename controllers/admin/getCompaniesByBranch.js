const db = require("../../db");
const { validateBranchDetails } = require("../../middleWares/validation");

module.exports = async (req, res) => {
  //Validate Branch
  const validation = validateBranchDetails({ branch: [req.params.branch] });
  if (validation.error) {
    return res
      .status(400)
      .send({ status: false, message: validation.error.details[0].message });
  }
  //Getting companies from db
  //SQL Query

  db.query(
    `SELECT Company_Id FROM ELIGIBLE_BRANCHES WHERE Branch =?`,
    [req.params.branch],
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
        db.query(
          `SELECT Name FROM COMPANIES WHERE ID IN (${results
            .map((result) => result.Company_Id)
            .join(",")})`,
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
              const companiesList = results
                .map((result) => result.Name)
                .join(",");
              res.send({ Companies: companiesList });
            }
          }
        );
      }
    }
  );
};
