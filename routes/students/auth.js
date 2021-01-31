const router = require('express').Router();
const adminController = require('../../controllers/adminController');
const refreshToken = require('../../utils/refreshToken');

router.get('/login', adminController.login)

router.post('/register', adminController.register)

router.get('/logout', async (req, res) => {

    const email = req.body.email;
    const token = req.body.token;
    adminController.logout(token, email)
    res.send({
        message: "Successfully logged you out"
    })

})

module.exports = router;