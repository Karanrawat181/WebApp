const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({

    name:{
        type: String
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    phoneNum:{
        type: Number
    },    
})

const userModel = mongoose.model("users",userSchema)

module.exports= userModel
