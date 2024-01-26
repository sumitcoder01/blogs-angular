const mongoose = require('mongoose');
const { Schema } = mongoose;
const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        authorId: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
const Blog = mongoose.model("blogs", BlogSchema);
module.exports = Blog;
