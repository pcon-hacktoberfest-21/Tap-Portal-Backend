const router = require('express').Router();
const verify = require('../middleware/verifyToken');

router.get('/',verify,(req,res)=>{
    res.send('token verified');
    console.log(req.user);
});

module.exports = router;