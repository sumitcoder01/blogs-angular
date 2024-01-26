const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        userType: {
            type: String,
            default: "user"
        },
        blogs: [
            {
                blogId: { type: String },
            },
        ],
    },
    { timestamps: true }
);
const User = mongoose.model('users', UserSchema);
module.exports = User;