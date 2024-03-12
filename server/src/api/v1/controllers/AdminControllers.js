
//-------------- Model Specific Stuff
const UserModel = require('../models/UsersModel'); //User modal

const CollegeModel = require('../models/CollegeModel'); //College modal

const PostModel = require('../models/PostModel'); //POst Modal
const { sendMail } = require('../middlewares/SendMail');


//----------- Controllers of Admin

module.exports.GetVerifiedCollegeList = async (req, res) => {

    try {
        const colleges = await CollegeModel.find({ verified: true });

        return res.status(200).json({ success: true, msg: 'fetch all verified colleges', colleges })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}

module.exports.DeleteCollege = async (req, res) => {

    try {
        const { _id } = req.params;

        const colleges = await CollegeModel.findOneAndDelete({ _id });

        if(!colleges) return res.status(404).json({success:false,msg:"College not found"})

        sendMail(colleges?.email,"Alumn Connect : | No Reply","Deleting your request to verify the college")

        return res.status(200).json({ success: true, msg: 'Delete the college successfully' })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}

module.exports.GetVerifiedAlumniList = async (req, res) => {

    try {
        const alumnis = await UserModel.find({ role: 'alumni', verified: true });

        return res.status(200).json({ success: true, msg: 'fetch all verified colleges', alumnis })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}

module.exports.DeleteUser = async (req, res) => {
    console.log(req.params);
    try {
        const { _id } = req.params;

        const user = await UserModel.findOneAndDelete({ _id });

        if(!user) return res.status(404).json({success:false,msg:"User not found"})

        sendMail(user?.email,"Alump Connect: No Reply","Deleting your data by the admin")

        return res.status(200).json({ success: true, msg: 'Delete the user successfully' })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}

module.exports.GetVerifiedStudentList = async (req, res) => {

    try {
        const students = await UserModel.find({ role: 'student', verified: true });

        return res.status(200).json({ success: true, msg: 'fetch all verified colleges', students })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}

module.exports.GetAllPostedJobsList = async (req, res) => {

    try {
        const posts = await PostModel.find();

        return res.status(200).json({ success: true, msg: 'fetch all posts', posts })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}

module.exports.DeletePostedJob = async (req, res) => {

    try {
        const { _id } = req.params;

        const post = await PostModel.findOneAndDelete({ _id });

        if(!post) return res.status(404).json({success:false,msg:"Post not found"})

        return res.status(200).json({ success: true, msg: 'Delete the post successfully' })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}

module.exports.GetUnverifiedCollegeList = async (req, res) => {

    try {
        const colleges = await CollegeModel.find({ verified: false });

        return res.status(200).json({ success: true, msg: 'fetch all un-verified colleges', colleges })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}

module.exports.VerfiyUnverifiedCollege = async (req, res) => {

    try {
        const { _id } = req.params;

        const college = await CollegeModel.findByIdAndUpdate(_id, { verified: true }, { new: true });

        if (!college)
            return res.status(404).json({ suceess: false, msg: 'College not found' });
        //send mail

        return res.status(200).json({ success: true, msg: 'Verify the college successfully' })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}
module.exports.DeleteUnverifiedCollege = async (req, res) => {

    try {
        const { _id } = req.params;

        const college = await College.findByIdAndDelete(_id);

        if (!college)
            return res.status(404).json({ suceess: false, msg: 'College not found' });

        return res.status(200).json({ success: true, msg: 'Delete college successfully' })


    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}

