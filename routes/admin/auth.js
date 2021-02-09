const router = require('express').Router();
const adminController = require('../../controllers/adminController');

//login route
router.get('/login', adminController.login)

//register route
router.post('/register', adminController.register)

//logout route
router.get('/logout', adminController.logout)

//get company
router.get('/companies', adminController.companies);
//add company
router.post('/companies/add', adminController.addCompany);
//update or edit company
router.put('/companies/update/:id', adminController.updateCompany);
//delete company
router.delete('/companies/delete/:id', adminController.deleteCompany);

module.exports = router;