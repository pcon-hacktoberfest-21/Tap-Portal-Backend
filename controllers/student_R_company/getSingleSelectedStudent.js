
const db = require('../../db');

const getSingleSelectedStudent = async(req,res) => {

    const RegNo = req.params.regNo;
    db.query(
        `SELECT STUDENT.RegNo, STUDENT.Name, STUDENT.Email, COMPANIES.Name FROM SELECTED 
        JOIN STUDENT 
        ON STUDENT.RegNo = SELECTED.RegNo
        JOIN COMPANIES 
        ON COMPANIES.Id = SELECTED.Company_Id 
        WHERE SELECTED.RegNo = ?
        `,[RegNo],function(err, results){
            if(err){
                res.send({
                    status: false,
                    message: err.sqlMessage,
                })
            }
            else if(results.length > 0){
                res.send({
                    status: true,
                    data: results,
                })
            }
            res.send({
                status: false,
                message: "Student is not selected",
            })
        }
    );
}

module.exports = getSingleSelectedStudent