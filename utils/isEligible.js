const db = require('../db');
const isEligible = (email, minPlacement,Company_id) => {

    db.query(
        `SELECT Cgpa,Branch,RegNo FROM STUDENT WHERE Email = ? `,
        [email],
        async function (err, results) {
            console.log(results);
            if (err) {
                console.log(err);
                return {
                    status: false,
                    message: "Something went wrong"
                };
            } else {
                const cgpa = results.Cgpa;
                const branch = results.Branch;
                const regNo = results.RegNo;
                //CHECKING ELIGIBLITY FOR CGPA
                db.query(
                    `SELECT Min_CGPA FROM COMPANIES WHERE Id = ? `,
                    [Company_id],
                    async function (err, results) {
                        console.log(results);
                        if (err) {
                        console.log(err);
                        return {
                            status: false,
                            message: "Something went wrong"
                        };
                        }
                        else {
                            const minCgpa = results.Min_CGPA;
                            if(minCgpa<=cgpa){
                                //CHECKING ELIGIBLITY FOR BRANCH
                                db.query(
                                    `SELECT Branch FROM ELIGIBLE_BRANCHES WHERE Company_Id = ? `,
                                    [Company_id],
                                    async function (err, results) {
                                        console.log(results);
                                        if (err) {
                                            console.log(err);
                                            return {
                                                status: false,
                                                message: "Something went wrong"
                                            };
                                        } 
                                        else {
                                            var status = false;
                                            for(var i=0;i<results.length();i++){
                                                if(results[i].Branch == branch){
                                                status = true;
                                                }
                                            }
                                        if(status){
                                            db.query(`SELECT COUNT(*) as count FROM SELECTED WHERE RegNo ?`,[regNo], (err, results)=>{
                                                if(err){
                                                    return {
                                                        status: false,
                                                        message: "Something went wrong"
                                                    };
                                                }
                                                if(results.count <= minPlacement){
                                                    return {
                                                        status: true,
                                                        message: "Eligible"
                                                    };
                                                }
                                                else
                                                return {
                                                    status: false,
                                                    message: "Not eligible"
                                                };
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    }
                
                )
            }
        }
    )                     
}

module.exports = isEligible;