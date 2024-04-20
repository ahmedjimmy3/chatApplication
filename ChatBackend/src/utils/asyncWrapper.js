const asyncWrapper = (fun)=>{
    return async(req,res,next)=>{
        try {
            fun(req,res,next)
        } catch (error) {
            next(error)
        }
    }
}

export default asyncWrapper