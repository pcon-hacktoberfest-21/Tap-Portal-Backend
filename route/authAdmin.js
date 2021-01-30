const router = require("express").Router();
const { validate } = require("../controller/validation");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//db connection
const mysql = require("../util/db");

//REGISTER
router.post("/register", async (req, res) => {
  //INPUT DATA VALIDATION
  const validation = validate(req);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }
  //HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);


  //INSERT INTO TABLE
  let sql = `INSERT INTO ADMIN (Email, Password, Branch) VALUES ('${req.body.email}', '${hashedPassword}','${req.body.branch}')`;
  mysql.query(sql, function (err, result) {
    if (err) {
      res.status(400).send(err.sqlMessage);
    } else {
      res.status(201);
      res.send("user created");
    }
  });
});

//LOGIN 
router.post("/login",  (req, res) => {

    //INPUT DATA VALIDATION
  const validation = validate(req);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }
  //Check Database

     mysql.query(
        `SELECT * FROM ADMIN WHERE Email = '${req.body.email}'`,
        async function (err, result, fields) {
            if(result.length == 0){
                return res.status(400).send(`Email or Password is wrong`);
            }
            else {
                //If user exists
                console.log('user exists');
                //Check Password
                const validPass = await bcrypt.compare(req.body.password, result[0].Password);
                if(!validPass) return res.status(400).send(`Invalid Password`);
                 console.log('password correct');
                 //Create and assign a token
                 const token = jwt.sign({_id: result[0].Email},process.env.TOKEN_SECRET)
                res.header('auth-token', token).send(token);
                
        
        }

        }
      );
    
});

module.exports = router;
