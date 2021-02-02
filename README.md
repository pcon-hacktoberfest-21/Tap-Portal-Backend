---
![GitHub custom open for Contribution](https://img.shields.io/static/v1?label=Open%20For&message=Contribution&color=%3CCOLOR%3E)

# Tap-Portal-Backend

The aim of this project is to develop an online application for training and placement department of our college. The system is an application that can be accessed throughout the college with proper login provided. This system can be used as an application for the Training and the Placement officers (TPO) of the college to manage the student information with regard to placement. Student login should be able to upload their information in the form of CV. The application provides the facility of maintaining the details of the students.

### This Repo is Backend of [Tap-Portal-Frontend](https://github.com/pcon-code-tribe/Tap-Portal-Frontend)

# Routes

## Admin Routes

### /admin/register 
-- METHOD : POST 
-- REQUIRED FIELDS : name, email, password, branch

### /admin/login 
-- METHOD : GET 
-- REQUIRED FIELDS : email, password

### /admin/logout 
-- METHOD : GET 
-- REQUIRED FIELDS : email, password

## Student Routes

### /student/register 
-- METHOD : POST 
-- REQUIRED FIELDS : email, password

### /student/login 
-- METHOD : GET 
-- REQUIRED FIELDS : email, password

### /student/logout 
-- METHOD : GET 
-- REQUIRED FIELDS : email, password
