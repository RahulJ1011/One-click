const user = require('../model/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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