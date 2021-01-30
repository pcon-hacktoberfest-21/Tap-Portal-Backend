const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).send('Invalid Token');
    }
}