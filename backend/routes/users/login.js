require('dotenv').config({ path: '../../.env' });
const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET;

router.post("/", [
  body("email", "Enter Valid Email").isEmail(),
  body("password", "Password Cannot be blank").exists(),
],
  async (req, res) => {
    //If There are returns bad Request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: "validation error!", errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user._id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: '7h' });
      res.status(200).json({ success: true, authToken, message: "Login Sucessfully" });


    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);
module.exports = router;