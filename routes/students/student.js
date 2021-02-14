const router = require('express').Router();
const userController = require('../../controllers/userController');
const studentController=require('../../controllers/student.queryController')
const isAuth= require('../../middleWares/student.isAuth')

router.use(isAuth);
//get student details
router.get('/',studentController.get);
// update sutudent details
router.put('/update',studentController.update);
//apply route
router.post('/apply', userController.apply);

module.exports = router;