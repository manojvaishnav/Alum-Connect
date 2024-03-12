const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const { STATUS_TYPE, USER_TYPE } = require('../utils/ModelUtils');
const { CareerSchema, ExperienceSchema } = require('./ExperienceModel');

//------------------ User schema to store the users ---------
const UserSchema = new mongoose.Schema({

    name: { type: String, required: true },

    email: {
        type: String, required: true, minlength: [5, "Email must be 5 char long "], maxlength: [120, "Email mustn't 120 char long"], unique: true, trim: true, lowercase: true, validate: {
            validator: function (value) {
                if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)))
                    throw new Error(`{VALUE} is not valid email`)
            }
        }
    },

    phone : String,

    course : String,

    password: { type: String, required: true, minlength: [8, "Password must be 8 char long "], maxlength: [120, "Password mustn't 120 char long"] },

    avatar: {
        public_id: String, url: {type:String,default:'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
    },

    role: { type: String, enum: USER_TYPE, required: true, default: 'student' }, //user means students

    verified: { type: Boolean, required: true, default: false},

    //------- College Related Info
    clg_id : String,
    
    clg_name: String, //ECA

    designation : String,

    profle_type: { type: String, default: 'public', enum: ['public', 'private'], required: true },

    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    start_year: {
        type: Date,
        required: true
    },

    passing_year: {
        type: Date,
        required: true
    },

    //---------- Carrer related info
    bio: String,

    experiences: [ExperienceSchema],

    skills: {
        type: [String],
        default: []
    },

    socialMedia: {
        facebook: String,
        twitter: String,
        linkedin: String,
        instagram: String,
        // Add other social media platforms as needed
    },


    resetToken: String,

    resetTokenExpiration: String,


}, { timestamps: true })

UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10d' })
}


//Modal to which collection form we save the data
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel