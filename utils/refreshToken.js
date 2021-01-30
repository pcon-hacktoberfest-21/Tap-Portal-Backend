
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const refreshToken = (token, email) => {
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log('decoded',decoded)
        return token;
    }
    catch(err){
        console.log('error',err)
        token = jwt.sign({
            Email: email,
        },process.env.TOKEN_SECRET,{expiresIn: '1h',});
        console.log(token)
        return token
    }
}

module.exports = refreshToken;