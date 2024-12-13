const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAcessToken=(payload)=>
{
    return jwt.sign(payload,"intern123",{expiresIn:'1h'});
}

const generateRefreshToken = (payload)=>
{
    return jwt.sign(payload,"intern123",{expiresIn:"30d"});
}

module.exports = {generateAcessToken,generateRefreshToken}