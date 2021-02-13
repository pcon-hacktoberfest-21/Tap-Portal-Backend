const jwt = require('jsonwebtoken')
const db = require("../db");

// a function to send error
function unauthorisez(res){
    res.status(401).send({
        "error":"not authorized"
    })
}

module.exports= async(req,res,next)=>{

    //Acquiring auth header
    const authHeader = req.get('Authorization');

    if(!authHeader){

        //no authHeader then user is not authenticated
        unauthorisez(res);
    }

    //else acquiring token from Bearer token
    const token = authHeader.split(' ')[1];
    if(!token || token === ''){
        //token is empty then user is not authenticated
        unauthorisez(res);
    }


    let decodedToken;
   
    try{
          //checking for valid token
        decodedToken =jwt.verify(token, process.env.TOKEN_SECRET);

        // getting information about the student from db 
        await db.query(
                `SELECT * FROM STUDENT WHERE Email =( SELECT Email FROM ALL_USER WHERE Token= ?)`,
                [token],async function (err, results) {
                    if (err) {
                    console.log(err);
                    throw Error('_'); 
                    } else {
                    req.student=results[0];
                    next();
                    }
            })
    }catch(e){
        console.log(e,"error found while getting information about student from db");
        unauthorisez(res)
    }

}