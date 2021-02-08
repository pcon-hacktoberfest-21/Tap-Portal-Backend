const jwt = require('jsonwebtoken');

const refreshToken = (token, email) => {
    try{

        //Valid token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log('decoded',decoded)
        return token;
        
    }
    catch(err){

        //expired token
        console.log('error',err)

        //issuing new token
        token = jwt.sign({
            Email: email,
        },process.env.TOKEN_SECRET,{expiresIn: '1h',});
        console.log(token)
        return token;

    }
}

module.exports = refreshToken;