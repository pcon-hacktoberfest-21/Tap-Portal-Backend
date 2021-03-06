const router = require('express').Router();
const sRc = require('../../controllers/student_R_company');

//GET LIST OF ALL SELECTED STUDENTS
router.get('/all',sRc.getAllSelectedStudent);

//GET SINGLE SELECTED STUDENT
router.get('/single/:regNo', sRc.getSingleSelectedStudent);

//GET LIST OF Students SELECTED BY A PARTICULAR company
router.get('/company/:company', sRc.getAllSelectedStudentByCompany)

//GET LIST OF Students SELECTED IN A BRANCH
router.get('/branch/:branch', sRc.getAllSelectedStudentByBranch)

module.exports = router;