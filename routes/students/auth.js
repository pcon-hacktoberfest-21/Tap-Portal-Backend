const router = require('express').Router();
const db = require('../../db')
const studentController = require('../../controllers/studentController');
const refreshToken = require('../../utils/refreshToken');


router.get('/', async function(req, res){
    refreshToken();
});

router.get('/login', studentController.login)

router.post('/register', studentController.register)

router.get('/logout', async (req, res) => {

    const email = req.body.email;
    const token = req.body.token;

    studentController.logout(token, email)
    res.send({
        message: "Successfully logged out"
    })
    
})

module.exports = router;