const express = require('express');
const User = require('../../models/User');
const Blog = require('../../models/Blog');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchUser = require('../../middlewares/fetchUser');

router.post('/', fetchUser, [
    body("title", "title must be atleast 5 characters").isLength({ min: 5 }),
    body("description", "description must be atleast 5 characters").isLength({ min: 5 }),
    body("category", "category must be atleast 4 characters").isLength({ min: 4 }),
],
    async (req, res) => {
        try {
            //If There are returns bad Request and errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, error: "validation error!", errors: errors.array() });
            }
            const { title, description, category } = req.body;
            const userId = req.user.id;
            const user = await User.findById(userId);
            if (!user) {
                res.status(404).json({ success: false, error: "Invalid user" });
            }
            const blog = await Blog.create({
                title,
                description,
                category,
                author: user.name,
                authorId: userId,
            });
            if (!blog) {
                res.status(404).json({ success: false, error: "Invalid Blogs" });
            }
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { blogs: { blogId: blog._id } } },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ success: false, error: "Invalid Blog" });
            }
            res.status(200).json({ success: true, message: "Blog created Sucessfully" });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    })
module.exports = router;