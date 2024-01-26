const express = require('express');
const Blog = require('../../models/Blog');
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if (!blog) {
            return res.status(404).json({ success: false, error: "Blog not found" });
        }
        return res.status(200).json({ success: true, blog, message: "Blog fetched successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router;
