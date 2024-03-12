const Routers = require('express').Router();


//--------------------------- Middlewares Specific Stuff ---------------------------------X
const isAuthenticated = require('../middlewares/isAuthenticated')
const isAlumni = require('../middlewares/isAlumni')

const UploadFile = require('../middlewares/UploadFile'); //Upload files

//------------------ Controllers Specific Stuff-------------------------X
const { Register,Login,Profile,getUser,FetchAllPosts, updateProfile, updateProfilePic, updateExperience, addSkill, MakePost, GetPost, DeletePost, AddConnection, forgotPasswordToken, forgotPassword, FetchAllClgPosts, FetchAllClgAlumnis,Logout } = require('../controllers/UsersControllers');
const isVerified = require('../middlewares/isVerified');


//----------------------- INitizlalzing auth apis's routes here -------------------X

//-------- Users Profile Specific Stuff
Routers.post('/register',UploadFile, Register); //Register the users  

Routers.post('/login', Login); //login the users 

Routers.post('/logout',isAuthenticated, Logout); //login the users 

Routers.get('/getUser', isAuthenticated, getUser); //get info of login users 

Routers.get('/profile',isAuthenticated, Profile);  //get profile

Routers.post('/forgot-password', forgotPasswordToken) // Forgot Password Token Generate

Routers.post('/reset-password', forgotPassword) // Reset  Password


//-------- All profile and career related paths
Routers.put('/update-profile',isAuthenticated,UploadFile,updateProfile);

Routers.put('/update-experience',isAuthenticated,updateExperience);

Routers.put('/add-skill',isAuthenticated,addSkill);


//--------------- Posts Specific Stuff
Routers.get('/fetch-all-posts', isAuthenticated, FetchAllPosts); 

Routers.post('/post', isAuthenticated,isAlumni,MakePost); 

Routers.get('/get-post/:_id',isAuthenticated, GetPost); 

Routers.delete('/delete-post/:_id',isAuthenticated,isAlumni, DeletePost); 

//------------ Clg post details

Routers.get('/fetch-clg-all-posts', isAuthenticated, FetchAllClgPosts); 


Routers.get('/fetch-clg-alumnis', isAuthenticated, FetchAllClgAlumnis); 




//------- Connection specific routes

Routers.put('/add-connection/:_id',isAuthenticated,isVerified, AddConnection); 


module.exports = Routers