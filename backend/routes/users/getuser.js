require('dotenv').config({ path: '../config.env' });
const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const fetchUser = require('../../middlewares/fetchUser');

router.get("/", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ success: false, user, error: "Invalid user details" });
    }
    res.status(200).json({ success: true, user, message: "User fetched Sucessfully" });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
);
module.exports = router;