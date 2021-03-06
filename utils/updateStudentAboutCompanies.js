//const db=require('../db')
const db=require('../db');
const {CompaniesUpdates}=require('../utils/email')
module.exports= async (minPlacements)=>{

    // getting companies which still not sent mail to student
     await  db.query('SELECT * FROM COMPANIES WHERE Student_informed=false',async (err,result)=>{

          if(err)
          console.log("some thing went wrong");
  
       // considering only first companey
          const res=result[0];
          if(!res)
          return;
          
        // destructuring information about the companey 
          const {Id,Name,Min_CGPA,Date_Of_Visit,Last_Date_Of_Apply,Package,Discription,PDF,Updated}=res;
              console.log(res,"loged all companies");
        // object which contain true for eligible branches
          var eligibleBranches={};
         // getting all eligible brances from eligible_branch table
          await db.query('SELECT * FROM ELIGIBLE_BRANCHES WHERE Company_id=?',[Id],async (err,response)=>{
                  console.log(response,"logging response to all elegible branches");
                  if(response)
                    await response.map((reso)=>{
                         eligibleBranches[reso.Branch]=true;
                     })

                     await db.query('SELECT * FROM STUDENT',async (errorInFeatchingstudent,students)=>{
                        if(errorInFeatchingstudent)
                        console.log("got error suring fetching data about students");
                        else{
                              await students.map(async (student)=>{
                              console.log("went into student loop");
                               // it varifies number of placemments stutent got and proceed further if placement count is less than minimum one
                               var placementCountEligible=true;
            
                               await db.query(`SELECT COUNT(*) as count FROM SELECTED WHERE RegNo =?`,[student.RegNo],async (err, resultoo)=>{
                                   console.log("in check of minimum placement");
                                    if(err) console.log("err during count");
                                        if(resultoo.count>=minPlacements)
                                        placementCountEligible=false;
                                       
                                    if(student.Cgpa>=Min_CGPA && eligibleBranches[student.Branch] && placementCountEligible  )
                                    {
                                          try{
                                              await CompaniesUpdates(student.Email,res);
                                              console.log(`sent mail to ${student.Name} for companey ${Name}`);
                                            } catch(erorMail){
                                                console.log(`not able to send mail to ${student.Name}`);
                                          }   
                                    }
                                    else{
                                        console.log("not eligible to to send mail ");
                                    }
                                });
            
                        })}
                        // updateing db that students are informed about the companey
                        await db.query('UPDATE COMPANIES SET Student_informed=true WHERE Id=?',[Id],(errorDuringCompaneyUpdate,_)=>{
                            if(errorDuringCompaneyUpdate)
                            console.log("found error during companey update");
                            else console.log("updated companey sucessfulley");
                        })
                    })

              });
          })

      console.log("hioloe",minPlacements);
     
}