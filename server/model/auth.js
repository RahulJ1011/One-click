const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:
    {
        type:String,
        required:true
    },
    Email:
    {
        type:String,
        required:true
    },
    Password:
    {
        type:String,
        required:true
    }
},
{
    timestamps:true
})

const auth = mongoose.model('auth',userSchema);
module.exports = auth;