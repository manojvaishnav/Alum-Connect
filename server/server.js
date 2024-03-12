
require('dotenv').config() //When you install first column dependies
require('./db') //When configure your connection with database

const express = require('express')
const app = express();


const cors = require('cors') //When your app's api connect with the forntend applications
app.use(cors())

//When use your app any json object or form fill up
app.use(express.json())
app.use(express.urlencoded({extended:false}));


//-------- Stuff for using the cookies
const cookieParser = require('cookie-parser');

app.use(cookieParser()); //use cookie-parser middleware

//------------- Setup the cloudinary
const cloudinary = require('cloudinary')

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


app.get('/',(req,res)=>{
    res.send(`Welcome in Alumini Tracking System ${process.env.SERVER} `)
})

// //Setup our routes dependence of versions
if(process.env.VERSION == 'v1'){
    console.log('v1')
    
    //-- User Specific Routes
    const userRoutes = require('./src/api/v1/routers/UserRoutes')
    app.use('/api/v1/user',userRoutes) 
    
    // //-- College Specific Routes
    const clgRoutes = require('./src/api/v1/routers/CollegeRoutes')
    app.use('/api/v1/clg',clgRoutes) 
    
    //-- Admin Specific Routes
    const AdminRoutes = require('./src/api/v1/routers/AdminRoutes')
    app.use('/api/v1/admin', AdminRoutes) 


}

const Server = process.env.SERVER || 'http://localhost';
const Port = process.env.PORT || 8000 ;

app.listen(Port,()=> console.info(`Application listen at ${Server}:${Port}`))