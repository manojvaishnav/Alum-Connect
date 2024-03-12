const CollegeModel = require("../models/CollegeModel");
const UsersModel = require("../models/UsersModel");
const PostModel = require("../models/PostModel");

//----------- Import the packages from packages, use to make strong apis -------X
const bcrypt = require('bcryptjs'); //Convert password into hash

const cloudinary = require('cloudinary'); //To upload files--
const sendToken = require("../utils/SendToken");
const getDataUri = require("../utils/DataUri");



// Register the users, using POST '/api/v1/clg/clg-register'
module.exports.Register = async (req, res) => {

    try {
        //--------- Req.body content
        const { name, email, password, phone, institute_type, institute_code, website_link, address,courses } = req.body;


        //Requring all the specific fields
        if (!name || !email || !password || !institute_type || !institute_code || !website_link || !phone || !address) { return res.status(404).json({ success: false, msg: "All fields are required" }) };


        if (password.length < 8)
            return res.status(404).json({ success: false, msg: "Password & Confirm password must be 8 char long" })

        // Check the user is already register
        let college = await CollegeModel.findOne({ institute_code })
        if (college) { return res.status(401).json({ success: false, msg: "this crenditentals's college is already exist" }) };

        // //Upload profile pictures
        const file = req.file;

        if (!file)
            return res.status(404).json({ success: false, msg: "Logo is required" })

        const fileUri = await getDataUri(file);

        const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);


        //Converting the password into hash
        let hashPassword = await bcrypt.hash(password, 10);

        //Register the users
        college = await CollegeModel({
            name,
            email,
            password: hashPassword,
            logo_avatar: {
                public_id: myCloud.public_id, url: myCloud.secure_url
            }, institute_type, institute_code, website_link, phone, address,courses
        })
        await college.save();

        //Send the request to verify by the super admin

        //--------- Sending the token via cookies
        const token = college.getJWTToken();

        return res.status(200).json({ success: true, msg: "Your college is register, Please wait for it's verification", college ,token})

    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}

// Login the users, using POST '/api/v1/clg/clg-login'
module.exports.Login = async (req, res) => {
    try {
        //--------- Req.body content
        const { email, password } = req.body;

        //Requring all the specific fields
        if (!email || !password) { return res.status(404).json({ success: false, msg: "All fields are required" }) };

        // Check the user is not already register
        let college = await CollegeModel.findOne({ email })
        if (!college) { return res.status(401).json({ success: false, msg: "username/password not correct" }) };

        //Comparing the password of register and login user
        let hashPassword = await bcrypt.compare(password, college.password)
        if (!hashPassword) { return res.status(404).json({ success: false, msg: "username/password not correct" }) }

        //After login to check the status
        /*
            status is blocked redirected to block page
            status is progress redirect to progress page msg
            status is active then send token
        */

        //--------- Sending the token via cookies
        //--------- Sending the token via cookies
        const token = college.getJWTToken();

        let data = [college?._id, college?.name, college?.logo_avatar?.url, college?.verified];


        return res.status(200).json({ success: true, msg: `welcome back, ${college?.name}`, college: data,token })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}

module.exports.CollegeProfile = async (req, res) => {
    try {


        const college = req.college;

        return res.status(200).json({ success: true, msg: `welcome back, ${college?.name}`, college })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }

}

module.exports.UpdateCollegeProfile = async (req, res) => {
    try {

        const { website_link } = req.body;

        if (website_link) req.college.website_link = website_link;

        const file = req.file;

        if (file) {

            const fileUri = await getDataUri(file);

            const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

            const logo_avatar = {
                public_id: myCloud.public_id, url: myCloud.secure_url
            }

            req.college.logo_avatar = logo_avatar;

        }
      

        await req.college.save();

        return res.status(200).json({ success: true, msg: "Update college website-detail" })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }

}

module.exports.GetAllClgStudentVerifiedList = async (req, res) => {
    try {

        const clgStudents = await UsersModel.find({role:'student',verified:true,clg_name:req.college.name});
      

        return res.status(200).json({ success: true, msg: "Fetch all the students",students:clgStudents })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }

}

module.exports.GetAllClgAlumniVerifiedList = async (req, res) => {
    try {

        const clgAlumni = await UsersModel.find({role:'alumni',verified:true,clg_name:req.college.name})

        return res.status(200).json({ success: true, msg: "Fetch all the alumnis",alumnis:clgAlumni })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }

}

module.exports.GetAllClgPostList = async (req, res) => {
    try {

        const posts = await PostModel.find({clg_name:req.college.name})

        return res.status(200).json({ success: true, msg: "Fetch all the students",posts })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }

}


module.exports.GetAllClgStudentList = async (req, res) => {
    try {

        const clgStudents = await UsersModel.find({role:'student',verified:false,clg_name:req.college.name})     

        return res.status(200).json({ success: true, msg: "Fetch all unverified students",students:clgStudents })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }

}

module.exports.GetAllClgAlumniList = async (req, res) => {
    try {

        const clgAlumni = await UsersModel.find({role:'alumni',verified:false,clg_name:req.college.name})

        return res.status(200).json({ success: true, msg: "Fetch all the alumnis",alumnis:clgAlumni })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }

}

module.exports.VerifyUserByClg = async (req, res) => {
    try {

        const { _id } = req.params;

        const user = await UsersModel.findByIdAndUpdate(_id, { verified: true }, { new: true });

        if (!user)
            return res.status(404).json({ suceess: false, msg: 'User not found' });
        //send mail

        return res.status(200).json({ success: true, msg: 'Verify the user successfully' })



    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }

}

module.exports.DeleteUserByClg = async (req, res) => {
    try {

        const { _id } = req.params;

        const user = await UsersModel.findByIdAndDelete(_id, { verified: true }, { new: true });

        if (!user)
            return res.status(404).json({ suceess: false, msg: 'User not found' });
        //send mail

        return res.status(200).json({ success: true, msg: 'Delete the user successfully' })



    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }

}

