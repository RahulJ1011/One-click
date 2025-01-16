const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {google} = require('googleapis')
dotenv.config();

const generateAcessToken=(payload)=>
{
    return jwt.sign(payload,"intern123",{expiresIn:'1h'});
}

const generateRefreshToken = (payload)=>
{
    return jwt.sign(payload,"intern123",{expiresIn:"30d"});
}
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;



exports.oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'postmessage'
);


module.exports = {generateAcessToken,generateRefreshToken}