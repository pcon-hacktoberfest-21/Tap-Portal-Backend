const db = require("../../db");
const ExcelJS = require('exceljs');
const fs=require("fs");
const path=require("path");

module.exports = async (req, res) =>{
    try{
        const companyId=req.body.companyId;
        queryPromise=()=>{
            return new Promise((resolve,reject)=>{
                db.query(`SELECT * FROM APPLICATION where COMPANY_ID=?`,[companyId],(err,results)=>{
                    if(err){
                        return reject(err);
                    }
                    return resolve(results);
                });
            });
        };

        const result=await queryPromise();

        const workbook=new ExcelJS.Workbook();
        const worksheet=workbook.addWorksheet('Applied Students');
        worksheet.columns=[
            {header:'S.no',key:'s.no',width:10},
            {header:'RegNo',key:'regno',width:20},
            {header:'Email',key:'email',width:30},
            {header:'Company_ID',key:'companyid',width:20},
        ];
        for(let i=0;i<result.length;i++){
            worksheet.addRow({'s.no':i+1,'regno':result[i].RegNo,'email':result[i].Email,'companyid':result[i].COMPANY_ID});
        }

        worksheet.getRow(1).eachCell((cell)=>{
            cell.font={bold:true}
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'f5b914' }
            }
            cell.border = {
                left: { style: 'thin' },
                bottom:{style:'thin'},
                right:{style:'thin'}
            }
        });
        await workbook.xlsx.writeFile('applied.xlsx');
        res.download('applied.xlsx',()=>{
            fs.unlinkSync('applied.xlsx');
        });
    }catch(error){
        return console.log(error);
    }
}