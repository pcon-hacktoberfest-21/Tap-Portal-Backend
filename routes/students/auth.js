const router = require('express').Router();
const userController = require('../../controllers/userController');
const refreshToken = require('../../utils/refreshToken');

router.get('/login', userController.login)

router.post('/register', userController.register)

router.get('/logout', async (req, res) => {

    const email = req.body.email;
    const token = req.body.token;
    userController.logout(token, email)
    res.send({
        message: "Successfully logged out"
    })

})

module.exports = router;