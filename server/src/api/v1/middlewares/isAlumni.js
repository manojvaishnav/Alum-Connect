

const isAlumni = async(req,res,next)=>{
    try {
        
        const user = req.user;

        if(user.role != 'alumni' || user.verified == false)
            return res.status(404).json({success:false,msg:"Only alumni can processed further"})

        next();

    } catch (error) { return res.status(500).json({success:false,msg:error.message})  }
}

module.exports = isAlumni;