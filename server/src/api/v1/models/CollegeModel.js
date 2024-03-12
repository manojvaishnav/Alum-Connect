const mongoose = require('mongoose');
const { INSTITUTE_TYPE, STATUS_TYPE } = require('../utils/ModelUtils');

const jwt = require('jsonwebtoken')

//------------------ College schema to store the Colleges ---------
const CollegeSchema = new mongoose.Schema({
    
    name: { type: String, required: true },

    institute_type:{type:String,required:true,enum:INSTITUTE_TYPE},

    institute_code: { type: String, required: true, unique: true, trim: true, lowercase: true },

    email: {
        type: String, required: true, minlength: [5, "Email must be 5 char long "], maxlength: [120, "Email mustn't 120 char long"], unique: true, trim: true, lowercase: true, validate: {
            validator: function (value) {
                if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)))
                    throw new Error(`{VALUE} is not valid email`)
            }
        }
    },
    
    password: { type: String, required: true, minlength: [8, "Password must be 8 char long "], maxlength: [120, "Password mustn't 120 char long"] },

    phone : {type:String,required:true,minlength: [10, "Phone must be 10 char long "], maxlength: [13, "Phone mustn't 13 char long"], unique: true, trim: true, lowercase: true},

    logo_avatar : {
        public_id: String, url: String
    },

    courses : [String],

    website_link : String,

    address : String,

    verified: { type: Boolean, required: true,default:false }

}, { timestamps: true })


CollegeSchema.methods.getJWTToken = function (){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:'10d'})
}


//Modal to which collection form we save the data
const CollegeModel = mongoose.model('College', CollegeSchema)

module.exports = CollegeModel