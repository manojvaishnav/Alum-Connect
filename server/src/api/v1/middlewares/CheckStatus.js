

//---------- Middleware to check the status of the users, clg,
const CheckStatus = async(res,req,next)=>{
    try {
    
        console.log(req.user);

        if(req.user?.status != 'active')
            return res.status(404).json({success:false,msg: `Your status is ${req.user?.status}, Please Wait`})

        next();

    } catch (error) {
        return res.status(500).json({success:false,msg:error.message})
    }
}

module.exports = CheckStatus;