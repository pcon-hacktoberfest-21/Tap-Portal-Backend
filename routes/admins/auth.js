const router = require('express').Router();

router.get('/login', async(req, res)=>{
    res.send("login")
})

module.exports = router;