const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const refreshToken = require('../utils/refreshToken');
const { validateStudent } = require('../middleWares/validation');

module.exports = {
  //Login USERS
  login: async (req, res) => {

    console.log('ip address',req.ip)
    //Acquiring email and passwords from body
    const email = req.body.email;  
    const password = req.body.password;   

    //INPUT DATA VALIDATION
    const validation = validateStudent(req);
    if (validation.error) {
      console.log('Invalid credentials',validation.error.details[0].message)
      return res
        .status(400)
        .send({ status:false,message: validation.error.details[0].message });
    }

    //SQL Query
    db.query(`SELECT * FROM ALL_USER WHERE Email = ? `,[email],async function(err, results){
      if(err){
          console.log('Something went wrong',err)
          res.send({
              status: false,
              message:"Something went wrong"
          })
      }
      else  {
        let status = true, message;
        //USER is found
        if(results.length > 0){
          const isEqual = await bcrypt.compare(password,results[0].Password);
          if(!isEqual){
            //Incorrect Password 
            console.log( "Incorrect Password");
            status = false;
            message = "Incorrect Password";
          }

          let token;

          //If token is not there then providing a new token
          if(results[0].Token == null){
              token = jwt.sign({
                  Email: results[0].Email,
              },process.env.TOKEN_SECRET,{expiresIn: '1h',});
          }

          //If token is already there then checking for its expiry 
          //If expired providing him/ her new token
          //Else returing the same token 
          else{
              token = refreshToken(results[0].Token, results[0].Email);
          }

          console.log('token',token)

          //Saving the token in database
          db.query(`UPDATE ALL_USER SET Token = ? WHERE Email = ?`,[token, email], function(err, results){
              if(err){
                  console.log('Something went wrong',err)
                  status = false;
                  message = "Something went wrong";
              }
              else{
                  console.log('successfully saved token')
                  console.log(results)
              }
          })

          if(status){
              res.send({
                  status,
                  token,
                  email:  results[0].Email
              })
          }
          else{
              res.send({
                  status,
                  message
              })
          }
        }
        else{
            console.log("Student not found")
            res.status(400).send({
              status: false,
              message: "Student not found"
          })
        }
      }
    })
  }, 

// Register USERS
  register: async (req, res) => {

    //Requiring email and password from body
    const email = req.body.email;
    const password = req.body.password; 

    //INPUT DATA VALIDATION
    const validation = validateStudent(req);
    if (validation.error) {
      console.log('invalid credentials',validation.error.details[0].message)
      return res
        .status(400)
        .send({ status:false,message: validation.error.details[0].message });
    }

    //Hashing the password
    const hashedPassword = await bcrypt.hash(password,12)

    //SQL query
    db.query(`INSERT INTO ALL_USER (Email, Password) VALUES(?,?)`,[email, hashedPassword],function(err, results){
      //Registration failed
      if(err){
        console.log('error',err.sqlMessage)
        res.send({
            status: false,
            message: err.sqlMessage
        })
      }
      //Registration success  
      else  {
        console.log('successfully registered')
        console.log(results)
        res.send({
            status: true,
            message:"Successfully registered"
        })
      }
    })
  },
  
  //Logout USERS
  logout : async (req, res) => {
  
    //Acquiring token from header
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    // Deleting the jwt token from database
    db.query(`UPDATE ALL_USER SET Token = NULL WHERE Email = ?`,[decodedToken.Email],function(err, results){
      if(err){
          console.log('logout unsuccessful', err.sqlMessage)
          res.send({
              status: false,
              message: err.sqlMessage
          })
      }
      else{
        console.log('logged you out')
        res.send({
            status: true,
            message:"Successfully logged you out"
        })
      }
    })
  },
};
