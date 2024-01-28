const express = require('express');
const User = require('../../models/User');
const Blog = require('../../models/Blog');
const router = express.Router();
const fetchUser = require('../../middlewares/fetchUser');

router.delete('/:id', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, error: "Invalid user" });
        }
        const deletedBlog = await Blog.findOneAndDelete({ _id: req.params.id, authorId: userId });

        if (!deletedBlog) {
            return res.status(404).json({ success: false, error: "Blog not found or unauthorized" });
        }
        await User.findOneAndUpdate({ _id: userId }, { $pull: { blogs: { blogId: req.params.id } } });

        res.status(200).json({ success: true, message: "Blog deleted Sucessfully" });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})
module.exports = router;