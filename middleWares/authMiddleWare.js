const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {

    //Acquiring auth header
    const authHeader = req.get('Authorization');
    if(!authHeader){

        //no authHeader then user is not authenticated
        req.isAuth = false;
        return next();
    }
    //else acquiring token from Bearer token
    const token = authHeader.split(' ')[1];
    if(!token || token === ''){
        //token is empty then user is not authenticated
        req.isAuth = false;
        return next();
    }

    let decodedToken;
    try{
        //checking for valid token
        decodedToken =jwt.verify(token, process.env.TOKEN_SECRET)
    }
    catch(err){
        // not valid token , then not authenticated 
        req.isAuth = false;
        return next();
    }

    if(!decodedToken){
        //token expired, not authenticated
        req.isAuth = false;
        return next();
    }

    //Valid token, authenticated
    req.isAuth = true;
    next();
}