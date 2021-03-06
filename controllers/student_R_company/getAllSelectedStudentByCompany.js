const db = require("../../db");

const getAllSelectedStudentByCompany = async(req, res) => {

    const companyId = req.params.company;
    console.log(companyId)
    db.query(
        `SELECT STUDENT.RegNo, STUDENT.Name, STUDENT.Email, COMPANIES.Name FROM SELECTED 
        JOIN STUDENT 
        ON STUDENT.RegNo = SELECTED.RegNo
        JOIN COMPANIES
        ON COMPANIES.Id = SELECTED.Company_Id 
        WHERE SELECTED.Company_Id = ?
        `,[companyId],function(err, results){

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

module.exports = getAllSelectedStudentByCompany;