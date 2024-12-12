const mongoose = require('mongoose');
const companystatusSchema = new mongoose.Schema({
    CompanyName:
    {
        type:Schema.Types.ObjectId,
        ref:'company'
    },
    Status:{
        type:String,
        default:'pending',

    },

})

const status = mongoose.model('status',companystatusSchema);
module.exports = status;