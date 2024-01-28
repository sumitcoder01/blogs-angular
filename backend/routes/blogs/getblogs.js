const express = require('express');
const User = require('../../models/User');
const Blog = require('../../models/Blog');
const router = express.Router();
const fetchUser = require('../../middlewares/fetchUser');

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0;
        let blogs = [];
        if (limit > 0) {
            blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(limit);
        } else {
            blogs = await Blog.find({}).sort({ createdAt: -1 });
        }

        if (!blogs) {
            return res.status(404).json({ success: false, error: "Blogs not found" });
        }
        return res.status(200).json({ success: true, blogs, message: "Blogs fetched successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});
router.get('/getusersblogs', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, error: "Invalid user" });
        }
        const limit = parseInt(req.query.limit) || 0;
        let blogs = [];
        if (limit > 0) {
            blogs = await Blog.find({ authorId: userId }).sort({ createdAt: -1 }).limit(limit);
        } else {
            blogs = await Blog.find({ authorId: userId }).sort({ createdAt: -1 });
        }

        if (!blogs) {
            return res.status(404).json({ success: false, error: "Blogs not found" });
        }
        return res.status(200).json({ success: true, blogs, message: "Blogs fetched successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router;
