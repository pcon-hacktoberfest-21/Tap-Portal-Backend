const db = require('../../db');

const getAllSelectedStudent = async(req, res) => {
    db.query(
        `SELECT STUDENT.RegNo, STUDENT.Name, STUDENT.Email, COMPANIES.Name FROM SELECTED 
        JOIN STUDENT 
        ON STUDENT.RegNo = SELECTED.RegNo
        JOIN COMPANY 
        ON COMAPANIES.Id = SELECTED.Company_Id 
        `, function(err, results){
            if(err){
                res.send({
                    status: false,
                    message: err.sqlMessage,
                })
            }
            res.send(results);
        }
    );
}

module.exports = getAllSelectedStudent;