const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogsSchema = new mongoose.Schema( {
    title: {
        type: String,
        trim : true,
        required: true
    },
    body: {
        type: String,
        trim : true,
        required: true
    },
    authorId: {
        type: ObjectId,
        trim : true,
        required: true,
        ref: "Authors"

    },
    tags: [{type :String, trim : true}],
    category: {
        type: String,
        trim : true,
        required: true
    },
    subcategory: [{type :String, trim : true}],
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: String,
        default: null
    },
    publishedAt: {
        type: String,
        default: null
    },
    isPublished: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model('Blogs', blogsSchema)