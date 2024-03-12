const Routers = require('express').Router();

//--------------------------- Middlewares Specific Stuff ---------------------------------X
const UploadFile = require('../middlewares/UploadFile'); //Upload files
const isCollege = require('../middlewares/isCollege');


//------------------ Controllers Specific Stuff-------------------------X
const { Register,Login,CollegeProfile, UpdateCollegeProfile, GetAllClgStudentList, GetAllClgAlumniList, GetAllClgPostList, GetAllClgStudentVerifiedList, GetAllClgAlumniVerifiedList, VerifyUserByClg, DeleteUserByClg } = require('../controllers/CollegeControllers');


//----------------------- INitizlalzing colleges apis's routes here -------------------X
//----------- Only Clg Routes
Routers.post('/clg-register',UploadFile, Register); 

Routers.post('/clg-login', Login); 

Routers.get('/clg-profile', isCollege, CollegeProfile); 

Routers.put('/update-clg-profile', isCollege, UploadFile,UpdateCollegeProfile); 

//--------- Getting list of related users
Routers.get('/clg-student-verified-list', isCollege, GetAllClgStudentVerifiedList); 
Routers.get('/clg-alumni-verified-list', isCollege,GetAllClgAlumniVerifiedList); 
Routers.get('/clg-student-list', isCollege, GetAllClgStudentList); 
Routers.get('/clg-alumni-list', isCollege,GetAllClgAlumniList); 

//--------- Post Specific Stuff
Routers.get('/clg-posts', isCollege,GetAllClgPostList); 


//--------------- Users Verfications the users 
Routers.put('/verify-user-by-clg/:_id',isCollege,VerifyUserByClg);
// Routers.put('/verify-user-by-clg',isCollege,VerifyUsByClg);
Routers.delete('/delete-user-by-clg/:_id',isCollege,DeleteUserByClg);

module.exports = Routers