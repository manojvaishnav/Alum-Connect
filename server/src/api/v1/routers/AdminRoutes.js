
const Routers = require('express').Router();


//---------- Controllers Specific Stuff
const { GetVerifiedCollegeList, DeleteCollege, GetVerifiedAlumniList, DeleteUser, GetVerifiedStudentList, GetAllPostedJobsList, DeletePostedJob, GetUnverifiedCollegeList, VerfiyUnverifiedCollege } = require('../controllers/AdminControllers');

//--------------------------- Middlewares Specific Stuff ---------------------------------X

const isAdmin = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');





//----------------------- INitizlalzing admin apis's routes here -------------------X

//------ College Specific Routes
Routers.get('/fetch-verify-clg-list', isAuthenticated, isAdmin, GetVerifiedCollegeList);

Routers.get('/fetch-unverify-clg-list', isAuthenticated, isAdmin, GetUnverifiedCollegeList);

Routers.put('/verify-clg/:_id', isAuthenticated, isAdmin, VerfiyUnverifiedCollege);

Routers.delete('/delete-clg/:_id', isAuthenticated, isAdmin, DeleteCollege);


//------ User Specific Routes
Routers.get('/fetch-verify-alumni-list', isAuthenticated, isAdmin,
    GetVerifiedAlumniList);

Routers.get('/fetch-verify-student-list', isAuthenticated, isAdmin,
    GetVerifiedStudentList);

Routers.delete('/delete-user/:_id', isAuthenticated, isAdmin, DeleteUser);


//------ Post Specific Routes
Routers.get('/allPosts', isAuthenticated, isAdmin,
    GetAllPostedJobsList);

Routers.get('/delete-post/:_id', isAuthenticated, isAdmin,
    DeletePostedJob);


module.exports = Routers