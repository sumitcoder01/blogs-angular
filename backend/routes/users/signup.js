const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

router.post("/", [
    body("name", "Name must be atleast 3 characters").isLength({ min: 3 }),
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
        min: 5,
    }),
],
    async (req, res) => {
        //If There are returns bad Request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: "validation error!", errors: errors.array() });
        }

        //check weather the user with this email exists already
        try {
            const { name, email, password } = req.body;
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ success: false, error: "Sorry a user with this email already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);
            //Create a  new User
            user = await User.create({
                name,
                email,
                password: secPass,
            });
            res.status(200).json({ success: true, message: 'Signup Successfully' });

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
);
module.exports = router;