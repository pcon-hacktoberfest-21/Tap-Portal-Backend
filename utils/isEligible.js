const db = require('../db');
const isEligible = async (email, minPlacement,Company_id,regNo) => {
    try {
        queryPromise1=()=>{
            return new Promise((resolve,reject)=>{
                db.query(`SELECT Cgpa,Branch,RegNo FROM STUDENT WHERE Email = ? `,
                [email],(err,results)=>{
                    if(err){
                        return reject(err);
                    }
                    return resolve(results);
                })
            })
        };
    
        queryPromise2=()=>{
            return new Promise((resolve,reject)=>{
                db.query(`SELECT Min_CGPA FROM COMPANIES WHERE Id = ? `,
                [Company_id],(err,results)=>{
                    if(err){
                        return reject(err);
                    }
                    return resolve(results);
                })
            })
        };
    
        queryPromise3=()=>{
            return new Promise((resolve,reject)=>{
                db.query(`SELECT Branch FROM ELIGIBLE_BRANCHES WHERE Company_Id = ? `,
                [Company_id],(err,results)=>{
                    if(err){
                        return reject(err);
                    }
                    return resolve(results);
                })
            });
        };
    
        queryPromise4=()=>{
            return new Promise((resolve,reject)=>{
                db.query(`SELECT COUNT(*) as count FROM SELECTED WHERE RegNo = ?`,[regNo],(err,results)=>{
                    if(err){
                        return reject(results);
                    }else{
                        return resolve(results);
                    }
                })
            });
        };
        
        const result1=await queryPromise1();
        const result2=await queryPromise2();
        const result3=await queryPromise3();
        const result4=await queryPromise4();

        const cgpa = result1[0].Cgpa;
        const branch = result1[0].Branch;
        const minCgpa=result2[0].Min_CGPA;
        if(minCgpa<=cgpa){

            let check=false;
            //checking eligible branch
            for(let i=0;i<result3.length;i++){
                if(result3[i].Branch==branch){
                    console.log(result3[i].Branch," ",branch);
                    check=true;
                }
            }
            console.log(check);
            if(check){
                if(minPlacement>result4[0].count){
                    console.log(result4[0]);
                    return{
                        status:true,
                        message:'Eligible'
                    };
                }else{
                    return{
                        status:false,
                        message:'Not Eligible',
                    };
                }
            }else{
                return{
                    status:false,
                    message:'Not Eligible',
                };
            }
        }else{
            return{
                status:false,
                message:'Not Eligible',
            };
        }
    } catch (error) {
        return{
            status:false,
            message:'something went wrong',
        };
    }
    
}

module.exports = isEligible;