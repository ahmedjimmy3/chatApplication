import jwt from 'jsonwebtoken'
import User from '../../db/models/user.model.js'

const auth = (systemRoles) =>{
    return async(req,res,next)=>{
        let {token} = req.headers
        if(!token){
            return next(new Error('You are not authorized please login',{cause:401}))
        }
        if(!token.startsWith('Hamada__')){
            return next(new Error('Invalid token',{cause:400}))
        }
        token = token.split('Hamada__')[1]
        const payload = jwt.verify(token , 'hamddldmv')
        if(!payload || !payload.id){
            return next(new Error('Invalid credentials',{cause:403}))
        }
        const authUser = await User.findById(payload.id)
        if(!authUser){
            return next(new Error('You should register first please',{cause:404}))
        }
        req.authUser = authUser
        next()
    }
}

export default auth