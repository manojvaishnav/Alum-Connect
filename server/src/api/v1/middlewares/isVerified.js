

const isVerified = async(req,res,next)=>{
    try {
        
        const user = req.user;

        if(user.verified == false)
            return res.status(404).json({success:false,msg:"You are not verified"})

        next();

    } catch (error) { return res.status(500).json({success:false,msg:error.message})  }
}

module.exports = isVerified;