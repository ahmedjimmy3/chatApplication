import { Schema,model } from "mongoose";

const chatSchema = new Schema({
    pOne:{type:Schema.Types.ObjectId,ref:'User',required:true},
    pTwo:{type:Schema.Types.ObjectId,ref:'User',required:true},
    messages:[{
        from:{type:Schema.Types.ObjectId,ref:'User',required:true},
        to:{type:Schema.Types.ObjectId,ref:'User',required:true},
        message:{type:String}
    }]
},{timestamps:true})

const Chat = model('Chat',chatSchema)

export default Chat