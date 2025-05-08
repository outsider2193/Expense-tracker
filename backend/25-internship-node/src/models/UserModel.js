const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    age:{
        type:Number
    },
    status:{
        type:Boolean
    },
    
    password:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    resetToken: { 
        type: String 
    },
    resetTokenExpiry: { 
        type: Date 
    },
    role: { type: String, enum: [ "user"] },
    // profileImage:{
    //     type: String,
    //     // required: true
    // }

},{
    timestamps:true
})

module.exports = mongoose.model("users",userSchema)