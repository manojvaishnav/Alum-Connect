
const mongoose = require('mongoose')

const objectId = mongoose.Schema.Types.ObjectId;

const PostSchema = mongoose.Schema({
    postedBy: {
        type: objectId, ref: 'User'
    },

    clg_name : String,

    designation: {
        type: String,
        required: true
    },

    cmp_detail:    {
        cmp_name: String,
        website: String
    },

    location: {
        type: String,
        required: true
    },

    job_type: String,

    description: {
        type: String,
        required: true
    }
}, { timeStamps: true });

const PostModel = new mongoose.model('Post', PostSchema);

module.exports = PostModel;