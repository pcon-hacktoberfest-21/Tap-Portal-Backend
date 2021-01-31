const router = require('express').Router();
const adminController = require('../../controllers/adminController');

//login route
router.get('/login', adminController.login)

//register route
router.post('/register', adminController.register)

//logout route
router.get('/logout', adminController.logout)

module.exports = router;