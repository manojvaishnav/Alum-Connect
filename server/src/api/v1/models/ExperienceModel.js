const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    cmp_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    joining_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: String,
        default: 'present',
        required:true
    }
});


const ExperienceModel = new mongoose.model('Experience', ExperienceSchema);

module.exports = {ExperienceModel,ExperienceSchema};