const db = require("../../db");
const logger = require("../../utils/logger");
const {
  validateUpdateCompany,
  validateBranchDetails,
} = require("../../middleWares/validation");

module.exports = async (req, res) => {
  //Aquiring header data
  const email = res.locals.decodedToken.Email;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  //Validate Admin Details
  const validation = validateUpdateCompany(req);
  if (validation.error) {
    return res
      .status(400)
      .send({ status: false, message: validation.error.details[0].message });
  }
  //Aquiring Data to Insert
  const Name = req.body.name;
  const Min_CGPA = req.body.mincgpa || null;
  const Date_Of_Visit = req.body.dateofvisit || null;
  const Last_Date_Of_Apply = req.body.lastdateofapply || null;
  const Package = req.body.package || null;
  const Description = req.body.description || null;
  const PDF = req.body.pdf || null;
  const reqbranch = req.body.branch || "";
  const branchList = reqbranch.replace(/ /g, "").split(",");
  //Validate Branch
  const validationBranch = validateBranchDetails({ branch: branchList });
  if (validationBranch.error) {
    return res
      .status(400)
      .send({
        status: false,
        message: validationBranch.error.details[0].message,
      });
  }
  //SQL query
  db.query(
    `UPDATE COMPANIES 
    SET Name =? ,Min_CGPA = ? ,Date_Of_Visit = ?, Last_Date_Of_Apply = ?, Package = ?, Description = ?, PDF = ?
    WHERE Id = ?`,
    [
      Name,
      Min_CGPA,
      Date_Of_Visit,
      Last_Date_Of_Apply,
      Package,
      Description,
      PDF,
      req.params.id,
    ],
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
        if (branchList.length !== 0) {
          //Update Branches from ELIGIBLE_BRANCHES Table
          const sql = branchList
            .map((branch) => `('${req.params.id}','${branch}')`)
            .join(",");
          db.query(
            `DELETE FROM ELIGIBLE_BRANCHES WHERE Company_Id =${req.params.id};
            INSERT INTO ELIGIBLE_BRANCHES ( Company_Id, Branch ) VALUES ${sql}`,
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
                //log to db
                logger(
                  `Company Updated with Id = ${req.params.id} & Name = ${req.body.name}`,
                  email,
                  ip
                );
                res.send({
                  message: "Company Updated Successfully ",
                  Id: req.params.id,
                });
              }
            }
          );
        } else {
          //log to db
          logger(
            `Company Updated with Id = ${req.params.id} & Name = ${req.body.name}`,
            email,
            ip
          );
          res.send({
            message: "Company Updated Successfully ",
            Id: req.params.id,
          });
        }
      }
    }
  );
};
