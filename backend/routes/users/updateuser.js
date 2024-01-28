const express = require('express');
const User = require('../../models/User');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchUser = require('../../middlewares/fetchUser');

router.put('/', fetchUser, [
    body("name", "Name must be atleast 3 characters").isLength({ min: 3 }),
    body("email", "Enter Valid Email").isEmail(),
],
    async (req, res) => {
        try {
            //If There are returns bad Request and errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, error: "validation error!", errors: errors.array() });
            }
            const { name, email } = req.body;
            const userId = req.user.id;
            const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
            if (!user) {
                res.status(404).json({ success: false, error: "Invalid user" });
            }
            res.status(200).json({ success: true, message: "User details updated Sucessfully" });
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    })
module.exports = router;