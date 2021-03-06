const db = require("../../db");

const getAllSelectedStudentByBranch = (req, res) => {
    const branch = req.params.branch;
    db.query(
        `SELECT STUDENT.RegNo, STUDENT.Name, STUDENT.Email, COMPANYIES.Name FROM SELECTED 
        JOIN STUDENT 
        ON STUDENT.RegNo = SELECTED.RegNo
        JOIN COMPANIES
        ON COMPANIES.ID = SELECTED.Company_id 
        WHERE STUDENT.Branch = ?
        `,[branch],function(err, results){

            if(err){
                res.send({
                    status: false,
                    message: err.sqlMessage,
                })
            }

            if(results.length > 0){
                res.send({
                    status: true,
                    data: results,
                })
            }

            res.send({
                status: false,
                message: "No Students are selected till now",
            })
        }
    );
}


module.exports = getAllSelectedStudentByBranch