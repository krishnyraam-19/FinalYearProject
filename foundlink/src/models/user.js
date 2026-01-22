import mongoose, {Document, Model, Schema} from "mongoose";



const UserSchema= new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{timestamps:true})

const User= mongoose.models.User|| mongoose.model("User",UserSchema);

export default User;