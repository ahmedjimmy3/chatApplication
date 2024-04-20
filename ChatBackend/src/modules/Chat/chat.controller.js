import Chat from '../../../db/models/chat.model.js'
import { getIO } from '../../utils/generateIO.js'
import User from '../../../db/models/user.model.js'

export const createChat = async(req,res,next)=>{
    const {destId,message} = req.body
    const {_id} = req.authUser
    const destUser = await User.findById(destId)
    if(!destUser){
        return next(new Error('This user not found',{cause:404}))
    }
    const chat = await Chat.findOne({$or:[
        {pOne:_id,pTwo:destId},
        {pOne:destId,pTwo:_id}
    ]})
    if(chat){
        chat.messages.push({
            from:_id,
            to:destId,
            message
        })
        await chat.save()
        getIO().emit('receiveMessage',message)
        return res.status(200).json({message:'Done',chat})
    }else{
        const newChat = await Chat.create({
            pOne:_id,
            pTwo:destId,
            messages:[{
                from:_id,
                to:destId,
                message
            }]
        })
        getIO().emit('receiveMessage',message)
        res.status(201).json({message:'Done',chat:newChat})
    }
}

export const getChat = async(req,res,next)=>{
    const {destId} = req.params
    const {_id} = req.authUser
    const chat = await Chat.findOne({$or:[
        {pOne:_id,pTwo:destId},
        {pOne:destId,pTwo:_id}
    ]}).populate([
        {path:'pOne'},
        {path:'pTwo'},
    ])
    res.status(200).json({message:'Done',chat})
}