import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fnm:{
        type:String, 
        required: [true, "USername is Required"],
    },

    lnm:{
        type:String, 
        required: [true, "USername is Required"],
    },
    phone:{
        type:Number, 
        required: [true, "USername is Required"],

    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
      },

    password: {
    type: String,
    required: [true, "Password is required"],
    },
    
},{timestamps:true,});


const Users = mongoose.model("Users", userSchema);
export default Users;