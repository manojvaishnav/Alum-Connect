const jwt = require("jsonwebtoken"); // For verify the users

const CollegeModel = require("../models/CollegeModel");

//--------- Fetch user help us, to find the token of the login users

const isCollege = async (req, res, next) => {
    try {
        const token = req.header('auth-token')

        if (!token)
            return res.status(404).json({ success: false, msg: 'You are not authenticate college' });

        const Secret_Key = process.env.JWT_SECRET_KEY;
        const college = await jwt.verify(token, Secret_Key);

        // console.log('users ',users)


        //Find the user by the id
        const collegeFind = await CollegeModel.findById(college._id).select('-password');

        if (!collegeFind) return res.status(404).json({ success: false, msg: 'College not found' });

        req.college = collegeFind;

        next();

    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}

module.exports = isCollege;