const jwt = require("jsonwebtoken");
const db = require("../../db");
const logger = require("../../utils/logger");
const { validateNewCompany, validateBranchDetails } = require("../../middleWares/validation");

module.exports = async (req, res) => {
  //Acquiring token from header
  const authHeader = req.get("Authorization");
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  //checking if token exists in header
  if (!authHeader)
    return res.status(403).send({ message: "resource not avilable" });
  console.log(authHeader);

  //checking if token is expired or altered
  let decodedToken;
  try {
    decodedToken = await jwt.verify(authHeader, process.env.TOKEN_SECRET);
  } catch (error) {
    if (error)
      return res.status(403).send({ message: "resource not avilable" });
  }
  const email = decodedToken.Email;

  //Validate New Admin Details
  const validation = validateNewCompany(req);
  if (validation.error) {
    return res
      .status(400)
      .send({ status: false, message: validation.error.details[0].message });
  }
  //Aquiring Data to Insert
  const Name = req.body.name;
  const Id = req.body.id;
  const Min_CGPA = req.body.mincgpa || null;
  const Date_Of_Visit = req.body.dateofvisit || null;
  const Last_Date_Of_Apply = req.body.lastdateofapply || null;
  const Package = req.body.package || null;
  const Description = req.body.description || null;
  const PDF = req.body.pdf || null;
  const reqbranch = req.body.branch || '';
  const branchList = reqbranch.replace(/ /g, '').split(',');
  //Validate Branch
  const validationBranch = validateBranchDetails({branch:branchList});
  if (validationBranch.error) {
    return res
      .status(400)
      .send({ status: false, message: validationBranch.error.details[0].message });
  }
  //SQL query
  db.query(
    `INSERT INTO COMPANIES ( Id, Name, Min_CGPA, Date_Of_Visit, Last_Date_Of_Apply, Package, Description, PDF) VALUES(?,?,?,?,?,?,?,?)`,
    [
      Id,
      Name,
      Min_CGPA,
      Date_Of_Visit,
      Last_Date_Of_Apply,
      Package,
      Description,
      PDF,
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
        if(branchList.length !== 0){
        //Insert Branches into ELIGIBLE_BRANCHES Table
        const sql = branchList.map(branch=> `('${Id}','${branch}')`).join(',')
        db.query(
          `INSERT INTO ELIGIBLE_BRANCHES ( Company_Id, Branch ) VALUES ${sql}`,
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
                `New Company Added with Id =${Id} & Name = ${req.body.name}`,
                email,
                ip
              );
              res.send({
                message: "New Company Added Successfully ",
                Id
              });
            }
          }
        );}
        else{
          //log to db
          logger(
            `New Company Added with Id =${Id} & Name = ${req.body.name}`,
            email,
            ip
          );
          res.send({
            message: "New Company Added Successfully ",
            Id
          });
        }
      }
    }
  );
};
