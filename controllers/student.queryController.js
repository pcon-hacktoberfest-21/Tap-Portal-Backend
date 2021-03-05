const db = require("../db");

module.exports={
    // function to get information about student
    get:(req,res)=>{
        res.send(req.student)
    },
    //function to update student details
    update:async (req,res)=>{
        try{
            await db.query(
            'UPDATE STUDENT SET Tenth = ?, Twelfth = ?, cv= ? WHERE email= ?',
            [req.body.ten || req.student.Tenth ,req.body.twelfth || req.student.Twelfth,req.body.cv || req.student.cv,req.student.Email],async function (err, results) {
            if (err) {
              console.log(err);
              throw Error('_'); 
            } else {
              res.send("updated sucessfully")
            }
        })
      }catch(e){
        console.log(err);
        res.status(400).send({"error":"some thing went wrong"});
      }
   }
}