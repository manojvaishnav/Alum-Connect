//-------check middle ware is admin

const isAdmin = async (req, res, next) => {
    console.log('user ',req.user)
    try {


        const user = req.user;

        if (user?.role != 'admin')
            return res.status(404).json({ success: false, msg: "Only admin can access this" })

        next();

    } catch (error) {   return res.status(500).json({ success: false, msg: error.message }); }
}

module.exports = isAdmin;