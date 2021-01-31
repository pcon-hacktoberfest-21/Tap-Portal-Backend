const router = require('express').Router();
const userController = require('../../controllers/userController');

//login route
router.get('/login', userController.login)

//register route
router.post('/register', userController.register)

//logout route
router.get('/logout', userController.logout)

module.exports = router;