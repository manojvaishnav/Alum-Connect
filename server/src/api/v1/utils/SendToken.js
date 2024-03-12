
const sendToken = async (res,user,next) => {
    try {

        
        const token = user.getJWTToken();
        
        const options = {
            expires: new Date(Date.now() +10 * 24 * 60 * 60 * 1000), //10 days
            httpOnly: true,
            // secure:true,
            sameSite: 'none'
        }
        res.cookie('token', token, options);

        next();
    } catch (error) {
        console.log('Error to send cookie', error);
    }
}

module.exports = sendToken;