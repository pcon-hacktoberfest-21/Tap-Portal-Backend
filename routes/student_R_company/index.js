const router = require('express').Router();
const sRc = require('../../controllers/student_R_company');

//GET LIST OF ALL SELECTED STUDENTS
router.get('/all',sRc.getAllSelectedStudent);

//GET SINGLE SELECTED STUDENT
router.get('/single', sRc.getSingleSelectedStudent);

//GET LIST OF Students SELECTED BY A PARTICULAR company
router.get('/company/all', sRc.getSelectedStudentByCompany)

//GET LIST OF Students SELECTED IN A BRANCH
router.get('/branch', sRc.getSelectedStudentByBranch)

module.exports = router;