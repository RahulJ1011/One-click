const user = require('../model/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {OAuth2Client} = require('google-auth-library')
const {generateAcessToken,generateRefreshToken} = require('../utils/TokenUtils')
const register = async(req,res)=>
{
    try
    {
        const {FirstName,LastName,Password,Email} = req.body;
        const isUser = await user.findOne({Email:Email});
        if(isUser)
        {
            return res.status(400).json({msg:"The Mail ID already exists"});

        }
        const hashedPassword = await bcrypt.hash(Password,10);
        const newUser = new user({
            FirstName:FirstName,
            LastName:LastName,
            Password:hashedPassword,
            Email:Email
        })
        await newUser.save();
        return res.status(201).json({msg:"User registered sucessfully"});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

const login = async(req,res)=>
{
    try
    {
        const {Email,Password} = req.body;
        const Isuser = await user.findOne({Email:Email});
        if(!Isuser)
        {
            return res.status(404).json({msg:"Email Id not found"});
        }
        const isMatch = await bcrypt.compare(Password,Isuser.Password);
        if(isMatch)
        {
            return res.status(401).json({msg:"Invalid password"});
        }
        const tokenPayload = {id:Isuser._id,Email:Email};
        const accessToken = generateAcessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);

        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            maxAge: 3600000,
            secure: true,
            sameSite:'None'
        })

        res.cookie('refreshToken',refreshToken,{
            httpOnly: true,
            maxAge: 259200000, 
            secure: true,   
            sameSite: 'None'
        })
        return res.status(201).json({msg:"Logged In sucessfully"});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({msg:"Internal Server Error"})
    }
}


const verifyGoogleToken = async(tokenId,clientId)=>
{
   const client = new OAuth2Client(clientId);
   const ticket = await client.verifyIdToken({
    idToken:tokenId,
    audience:clientId
   })
   const payload = ticket.getPayload();
   return payload;
}

const googleLogin = async(req,res)=>
{
    try
    {
        const {tokenId} = req.body;
        const payload = await verifyGoogleToken(tokenId, GOOGLE_CLIENT_ID);
        let user = await user.findOne({Email:payload.email});
        if(!user)
        {
            user = new user({
                Email:payload.email,
            })
            await user.save();
        }
        const tokenPayload = {
            email:user.Email,
            user_type:user.user_type
        }
        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);
    

        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          maxAge: 3600000, 
          secure: true,   
          sameSite: 'None' 
        });
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 259200000, 
          secure: true,   
          sameSite: 'None' 
        });
  
        res.status(200).json({ message: 'Login successful', user });
        
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

const logout = async(req,res)=>
{
    res.cookie('accessToken',null,{
        httpOnly:true,
        maxAge:-1,
        scure:true,
        sameSite:'None'
    })
    res.cookie('RefreshToken',null,{
        httpOnly:true,
        maxAge:-1,
        scure:true,
        sameSite:'None'
    })

    res.json({message:"Logout sucessfull"})
}


module.exports = {login,register,googleLogin,logout}