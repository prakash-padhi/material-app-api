const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/app-config");
const User = require("../models/user-model");

/**
 * @route GET api/auth-status
 * @desc Check authentication status
 */
router.get("/", async (req, res) => {
    try {
        const { authcookie } = req.cookies;

        // Verify token in Cookie
        jwt.verify(authcookie, jwtSecret, async (err, data) => {
            if (err || !data?.username) {
                res.status(200).json({ isAuthenticated: false });
            } else {
                const currentUser = await User.findOne({ username: data?.username });
                if (!currentUser) {
                    return res.status(400).json({ error: true, message: "Invalid user session" });
                } else {
                    res.status(200).json({ isAuthenticated: true, user: { username: data?.username, primaryColor: currentUser.color } });
                }
            }
        });
    } catch (error) {
        res.status(500).send("Server error");
    }
});

module.exports = router;