const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    FirstName:{
        type:Schema.Types.ObjectId,
        ref:'auth'

    },
    LastName:
    {
        type:Schema.Types.ObjectId,
        ref:'auth'
    },
    Email:
    {
        type:Schema.Types.ObjectId,
        ref:'auth'
    },
    Picture:
    {
        type:String
    },
    Resume:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    Work:
    {
        type:Number,
        required:true
    },
    College:
    {
        type:String,
        required:true   
    },
    Domain:
    {
        type:String,
        required:true
    },
    github:{
        type:String,
        required:true
    },
    linkedIn:{
        type:String,
        required:true

    },
    PhoneNumber:
    {
        type:String,
        required:true
    }
},{
    timestamps:true

})

const profile = mongoose.model('profile',profileSchema);
module.exports = profile;