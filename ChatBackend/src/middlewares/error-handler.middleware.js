const errorHandler = (error,req,res,next)=>{
    if(error){
        console.log(error)
        return res.status(error.cause || 500).json({message:error.message})
        next()
    }
}

export default errorHandler