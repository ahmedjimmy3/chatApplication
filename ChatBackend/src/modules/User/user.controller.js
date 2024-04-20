import User from '../../../db/models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getIO } from '../../utils/generateIO.js'

export const createUser = async(req,res,next)=>{
    const {email,password,username} = req.body
    const isEmailAlreadyExist = await User.findOne({email})
    if(isEmailAlreadyExist){return next(new Error('This email already Exist',{cause:400}))}
    const hashedPassword = bcrypt.hashSync(password,10)
    const createUser = await User.create({email,password:hashedPassword,username})
    res.status(201).json({message:'User created successfully',createUser})
}

export const login = async(req,res,next)=>{
    const {email,password} = req.body
    const isUserFound = await User.findOne({email})
    if(!isUserFound){return next(new Error('not found user',{cause:404}))}
    const isPasswordCorrect = bcrypt.compareSync(password,isUserFound.password)
    if(!isPasswordCorrect){return next(new Error('password is incorrect'))}
    const token = jwt.sign({id:isUserFound._id,username:isUserFound.username},'hamddldmv')
    res.status(200).json({message:'logged in success', access_Token:token})
}

export const getAllUsers = async(req,res,next)=>{
    const {_id:loggedIn} = req.authUser
    const users = await User.find({_id:{$ne:loggedIn}})
    res.status(200).json({users})
}