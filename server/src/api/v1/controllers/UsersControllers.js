//----------- Import the packages from packages, use to make strong apis -------X
const bcrypt = require('bcryptjs'); //Convert password into hash

const crypto = require('crypto'); //Use to ciper the tokens 

const cloudinary = require('cloudinary'); //To upload files--

//-------------- Model Specific Stuff
const UserModel = require('../models/UsersModel'); //User modal


//------------ Utils Specific Stuff
const {sendMail} = require('../middlewares/SendMail');
const getDataUri = require('../utils/DataUri');
const sendToken = require('../utils/SendToken');
const PostModel = require('../models/PostModel');
const { generateToken } = require('../utils/genrateToken');


//------------------ Creating the UsersControllerss to authenticate the users -----------X
// Register the users, using POST '/api/user/register'
module.exports.Register = async (req, res) => {


    try {
        //--------- Req.body content
        const { name, email, password, clg_name, start_year, passing_year, clg_id, linkedin_url,phone,course,bio } = req.body;

        //Requring all the specific fields
        if (!name || !email || !password || !clg_name || !start_year || !passing_year || !clg_id) { return res.status(404).json({ success: false, msg: "All fields are required" }) };

        if (passing_year <= start_year) {
            return res.status(404).json({ success: false, msg: "You fill wrong batch details" })
        }

        if (password.length < 8)
            return res.status(404).json({ success: false, msg: "Password & Confirm password must be 8 char long" })

        // Check the user is already register
        let users = await UserModel.findOne({ email })
        if (users) { return res.status(401).json({ success: false, msg: "User already exist" }) };

        //Converting the password into hash
        let hashPassword = await bcrypt.hash(password, 10);

        let socialMedia = {}

        if (linkedin_url) socialMedia.linkedin = linkedin_url

        //-------- Spliting the passing year and get year and month
        const splitDate = passing_year?.split('T')[0];
        const getYear = splitDate?.split('-')[0];
        const getMonth = splitDate?.split('-')[1];

        const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

let role = 'student';

if (getYear < currentYear || (getYear === currentYear && getMonth <= currentMonth)) 
        role = 'alumni';

  

        //Register the users
        users = await UserModel.create({
            name,
            email,
            password: hashPassword,
            clg_id, clg_name, start_year, passing_year, socialMedia,phone,course,bio,role
        })
        await users.save();

        //Now send the notification to particular clg in respect of clg_name
        // sendToken(res,users,next);


        const token = users.getJWTToken();

        let data = [users?._id, users?.name, users?.avatar?.url, users?.verified];


        return res.status(200).json({ success: true, msg: "Registration successfull", user: data,token })

    } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
}

// Login the users, using POST '/api/user/login'
module.exports.Login = async (req, res) => {
    try {
        //--------- Req.body content
        const { email, password } = req.body;

        //Requring all the specific fields
        if (!email || !password) { return res.status(404).json({ success: false, msg: "All fields are required" }) };

        // Check the user is not already register
        let users = await UserModel.findOne({ email })
        if (!users) { return res.status(401).json({ success: false, msg: "Your crenditentals is not correct" }) };

        //Comparing the password of register and login user
        let hashPassword = await bcrypt.compare(password, users.password)
        if (!hashPassword) { return res.status(404).json({ success: false, msg: " username & password are invalid" }) }

        //--------- Sending the token via cookies
        const token = users.getJWTToken();

        let data = [users?._id, users?.name, users?.avatar?.url, users?.verified];


        return res.status(200).json({ success: true, msg: `welcome back, ${users?.name}`, user: data,token })


    } catch (error) { return res.status(500).json({ success: false, msg: error }); }
}

module.exports.Logout = async (req, res) => {
    try {
       
        res.clearCookie('token');
        
        return res.status(200).json({success:true,msg:"You are successfully logout"})

    } catch (error) { return res.status(500).json({ success: false, msg: error }); }
}

//-------- Get the profile of the users
module.exports.getUser = async (req, res) => {
    try {

        const user = req.user;

        return res.status(200).json({ success: true, msg: "fetch profile", user })

    } catch (error) {

    }
}

//-------- Get the profile of the users
module.exports.Profile = async (req, res) => {
    try {

        const user = req.user;

        return res.status(200).json({ success: true, msg: "fetch profile", user })

    } catch (error) {

    }
}

//-------- Get the profile of the users
module.exports.FetchAllPosts = async (req, res) => {
    try {

        const posts = await PostModel.find({ postedBy: req.user?._id });

        return res.status(200).json({ success: true, msg: "fetch all posts", posts })

    } catch (error) {return res.status(500).json({success:false,msg:error.message})  }
}

//-------- Get the profile of the users
module.exports.FetchAllClgPosts = async (req, res) => {
    try {

        const posts = await PostModel.find({ clg_name:req.user.clg_name });

        return res.status(200).json({ success: true, msg: "fetch all posts", posts })

    } catch (error) { return res.status(500).json({success:false,msg:error.message})    }
}

//-------- Get the profile of the users
module.exports.FetchAllClgAlumnis = async (req, res) => {
    try {

        const alumnis = await UserModel.find({ clg_name:req.user.clg_name,role:'alumni' });

        return res.status(200).json({ success: true, msg: "fetch all alumnis", alumnis })

    } catch (error) { return res.status(500).json({success:false,msg:error.message})    }
}

//-------- Get the profile of the users
module.exports.MakePost = async (req, res) => {
    try {

        const { cmp_name, website, designation, location, job_type, description } = req.body;

        if (!cmp_name || !website || !designation || !location || !job_type || !description)
            return res.status(404).json({ success: false, msg: "All fields are required" });

        const cmp_detail = { cmp_name, website }


        await PostModel.create({
            postedBy: req.user._id, cmp_detail, location, job_type, description, designation, clg_name: req.user.clg_name
        })

        return res.status(200).json({ success: true, msg: "Upload your post successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}

module.exports.GetPost = async (req, res) => {
    try {

        const { _id } = req.params

        const post = await PostModel.findById(_id);

        if(!post) return res.status(200).json({success:false,msg:"Post not found"})

        return res.status(200).json({ success: true, msg: "Find your post successfully", post })

    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}

module.exports.DeletePost = async (req, res) => {
    try {

        const { _id } = req.params

        const post = await PostModel.findByIdAndDelete(_id);

        if (!post) return res.status(404).json({ success: false, msg: "Post not found" })

        return res.status(200).json({ success: true, msg: "Delete your post successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}

//-------- Get the profile of the users
module.exports.updateProfile = async (req, res) => {
    try {

        const { name, email, phone } = req.body;

        if (name) req.user.name = name;
        if (email) req.user.email = email;
        if (phone) req.user.phone = phone;

        const file = req.file;

        if (file) {

            const fileUri = await getDataUri(file);

            const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

            //-------First delete the avatar if exist?

            const avatar = { public_id: myCloud?.public_id, url: myCloud?.secure_url };

            req.user.avatar = avatar;
        }

        await req.user.save();

        return res.status(200).json({ success: true, msg: "Your profile is updated" });

    } catch (error) { return res.status(500).json({ success: false, msg: error.message }) }
}
//-------- Get the profile of the users
module.exports.updateProfilePic = async (req, res) => {
    try {

        const file = req.file;

        if (!file)
            return res.status(404).json({ success: false, msg: "File is required" })


        const fileUri = await getDataUri(file);

        const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

        //-------First delete the avatar if exist?

        const avatar = { public_id: myCloud?.public_id, url: myCloud?.secure_url };

        req.user.avatar = avatar;

        await req.user.save();

        return res.status(200).json({ success: true, msg: "Your profile is updated" });

    } catch (error) { return res.status(500).json({ success: false, msg: error.message }) }
}



module.exports.AddConnection = async (req, res) => {
    try {

        const { _id } = req.params

        if(req.user.connections.includes(_id))
            return res.status(404).json({success:false,msg:"You are alredy connected with them"})

        req.user.connections.push({ _id });

        await req.user.save();

        return res.status(200).json({ success: true, msg: "Add them in your connection successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}

module.exports.updateExperience = async (req, res) => {
    try {

        const { cmp_name, designation, description, joining_date, end_date } = req.body;

        if (!cmp_name || !designation || !description || !joining_date || !end_date) return res.status(404).json({ success: false, msg: "All fields are required" });

        const newExperience = {
            cmp_name,
            designation,
            description,
            joining_date,
            end_date
        };

        req.user.experiences.push(newExperience);
        await req.user.save();


        return res.status(200).json({ success: true, msg: "Update your experience details" });

    } catch (error) { return res.status(500).json({ success: false, msg: error.message }) }
}

module.exports.addSkill = async (req, res) => {
    try {

        const { skill } = req.body;

        if (!skill) return res.status(404).json({ success: false, msg: "All fields are required" });

        if(req.user.skills.includes(skill))
            return res.status(404).json({success:false,msg:"Skills already have"})


        req.user.skills.push(skill);
        await req.user.save();


        return res.status(200).json({ success: true, msg: "Update your skills details" });

    } catch (error) { return res.status(500).json({ success: false, msg: error.message }) }
}


// -------------------Forgot Password Token Generate-------------------
module.exports.forgotPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required.' });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const resetToken = generateToken();
        const resetTokenExpiration = Date.now() + 3600000;

        await UserModel.findByIdAndUpdate(user._id, { resetToken, resetTokenExpiration })

        const resetLink = `${process.env.FRONTEND_URL}/new-password?token=${resetToken}`;
        const emailText = `Click the following link to reset your password: ${resetLink}`;
        await sendMail(email, 'Password Reset', emailText);

        return res.status(200).json({ success: true, message: 'Password reset link sent to your email.' });

    } catch (error) {
        console.error('Error sending reset password email:', error);
        res.status(500).json({success:false,msg:error.message});
    }
}

// -------------------Forgot Password-------------------
module.exports.forgotPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and newPassword are required.' });
        }

        const user = await UserModel.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid or expired reset token.' });
        }

        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.json({ success: true, message: 'Password reset successful.' });

    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success:false,msg:error.message });
    }
}