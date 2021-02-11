const db = require('../db');
const router = require('../routes/students/auth');

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

const getSingleSelectedStudent = async(req,res) => {

    const RegNo = req.body.RegNo;
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
            if(results.length > 0){
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


const getSelectedStudentByCompany = async(req, res) => {

    const companyId = req.body.companyId;
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

const getSelectedStudentByBranch = (req, res) => {
    const branch = req.body.branch;
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




module.exports = {
    getAllSelectedStudent,
    getSingleSelectedStudent,
    getSelectedStudentByCompany,
    getSelectedStudentByBranch
}