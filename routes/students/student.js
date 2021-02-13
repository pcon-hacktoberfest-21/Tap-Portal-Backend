const router = require('express').Router();
const userController = require('../../controllers/userController');

//apply route
router.post('/apply', userController.apply)

module.exports = router;