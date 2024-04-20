import { Schema , model } from "mongoose";

const userSchema = new Schema(
    {
        username:{type:String,required:true,trim:true,lowercase:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
    },
    {
        timestamps:true,
        toObject:true,
        toJSON:true
    }
)

const User = model('User',userSchema)
export default User