---
![GitHub custom open for Contribution](https://img.shields.io/static/v1?label=Open%20For&message=Contribution&color=%3CCOLOR%3E)

# Tap-Portal-Backend

The aim of this project is to develop an online application for training and placement department of our college. The system is an application that can be accessed throughout the college with proper login provided. This system can be used as an application for the Training and the Placement officers (TPO) of the college to manage the student information with regard to placement. Student login should be able to upload their information in the form of CV. The application provides the facility of maintaining the details of the students.

### This Repo is Backend of [Tap-Portal-Frontend](https://github.com/pcon-code-tribe/Tap-Portal-Frontend)

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