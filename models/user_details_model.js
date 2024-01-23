const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            requred : [true ,'Please enter user name']
        },
        age : {
            type : Number ,
            requred : true ,

        },
        sex : {
            type : String ,
            requred : true ,

        },
        contact_no : {
            type : Number ,
            requred : true ,

        }
    },
    {
        timestamps : true
    },

)

const User = mongoose.model('User',userSchema);
module.exports = User;