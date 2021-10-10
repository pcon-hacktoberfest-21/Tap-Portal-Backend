---
![GitHub custom open for Contribution](https://img.shields.io/static/v1?label=Open%20For&message=Contribution&color=%3CCOLOR%3E)

# Tap-Portal-Backend

The aim of this project is to develop an online application for training and placement department of our college. The system is an application that can be accessed throughout the college with proper login provided. This system can be used as an application for the Training and the Placement officers (TPO) of the college to manage the student information with regard to placement. Student login should be able to upload their information in the form of CV. The application provides the facility of maintaining the details of the students.

### This Repo is Backend of [Tap-Portal-Frontend](https://github.com/pcon-code-tribe/Tap-Portal-Frontend)
### How to Use
1. Clone this repo.
2. Run `npm install`
2. start mysql server
3. make a database and import db.sql
4. Enter your credentials in .env file (take reference from eg-env.txt)
5. Run `node index`
## How to Contribute

> **Note 1:** If you've never made a pull request before, or participated in an open-source project, we recommend taking a look at this [wonderful video tutorial](https://youtu.be/ZI2D0CI4TXs). And if you want a more complete tutorial on using github, creating branches etc. , [here's a detailed video series](https://www.youtube.com/watch?v=3RjQznt-8kE&list=PL4cUxeGkcC9goXbgTDQ0n_4TBzOO0ocPR).Once you've got your feet wet, you're ready to come back and dive into Hacktoberfest fun!
> **Note 2:** **Super Important** Only the pull requests created between October 1st, 2021 and October 31st, 2021 will be counted!
1. Star this repository. :stuck_out_tongue:

2. And then you have to fork (make a copy) of this repo to your Github account.

3. Clone (download) your fork to your computer.

4. Set your streams so you can sync your clone with the original repo (get the latest updates)

   - [ ] <code>git remote add upstream https://github.com/pcon-hacktoberfest-21/Tap-Portal-Backend</code>

   - [ ] <code>git pull upstream master</code>

   - [ ] The above 2 commands will synchronize your forked version of the project with the actual repository.

5. Create a branch with your username.

6. Make the changes in your branch.

7. Commit and push the code to YOUR fork.

8. Create a pull request to have the changes merged into the origin.


# Routes

## Student Routes

### /student/register 
-- METHOD : POST 
-- REQUIRED FIELDS : email, password

### /student/login 
-- METHOD : GET 
-- REQUIRED FIELDS : email, password

### /student/logout 
-- METHOD : GET 
-- REQUIRED : Token in Authorization Header

### /studentQuery/
-- METHOD : GET
-- REQUIRED FIELDS : Token in Authorization Header

### /studentQuery/update
-- METHOD : PUT 
-- REQUIRED FIELDS : tenth,twelfth,cv,Token in Authorization Header

## Admin Routes

### /admin/register 
-- METHOD : POST 
-- REQUIRED FIELDS : name, email, password, branch

### /admin/login 
-- METHOD : GET 
-- REQUIRED FIELDS : email, password

### /admin/logout 
-- METHOD : GET 
-- REQUIRED : Token in Authorization Header

### /admin/companies  (get all companies)
-- METHOD : GET 
-- REQUIRED : Token in Authorization Header

### /admin/companies/id    (get company by id)
-- METHOD : GET 
-- REQUIRED : Token in Authorization Header

### /admin/companies/branch/BRANCH    (get companies by BRANCH)
-- METHOD : GET 
-- REQUIRED : Token in Authorization Header

### /admin/companies/add   (add new company)
-- METHOD : POST 
-- REQUIRED : Token in Authorization Header, name in body
-- OTHER FIELDS : (mincgpa, dateofvisit, lastdateofapply, package, description, pdf, branch seperated by commas) in body

### /admin/companies/update/id     (update company by id)
-- METHOD : PUT 
-- REQUIRED : Token in Authorization Header, name in body
-- OTHER FIELDS : (mincgpa, dateofvisit, lastdateofapply, package, description, pdf, branch seperated by commas) in body

### /admin/companies/delete/id   (delete company by id)
-- METHOD : DELETE 
-- REQUIRED : Token in Authorization Header

## SELECTED STUDENTS API

### /select/all  
-- METHOD : GET
-- REQUIRED : Token in Authorization Header

### /select/company/:company 
-- METHOD : GET
-- REQUIRED : Token in Authorization Header

### /select/branch/:branch 
-- METHOD : GET
-- REQUIRED : Token in Authorization Header

### /select/:regNo
-- METHOD : GET
-- REQUIRED : Token in Authorization Header
