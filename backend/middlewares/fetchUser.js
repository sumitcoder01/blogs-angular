const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET;

const fetchuser = (req, res, next) => {
    //Get the user from jwt token and add id to req object
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ success: false, error: "Please authenticate using a valid token" });
        }
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ success: false, error: "Please authenticate using a valid token" });
    }
    next();
};


module.exports = fetchuser;