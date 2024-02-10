const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { jwtSecret, cookieConfig } = require("../config/app-config");
const User = require("../models/user-model");

/**
 * @route POST api/login
 * @desc Authenticate user & set Cookie
 */
router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate if username is available in request
        if (!username) {
            return res.status(400).json({ error: true, message: "Please provide username" });
        }

        // Validate if password is available in request
        if (!password) {
            return res.status(400).json({ error: true, message: "Please provide password" });
        }

        // Check if user exists
		const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: true, message: "User doesn't exist!" });
        }

        // Check if password is matched with encrypted password
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ error: true, message: "Invalid password!" });
        }

        // Create jwt token for cookie
        const token = jwt.sign({ username: user.username }, jwtSecret);

        // Save token in cookie
        console.log("cookieConfig ==>", cookieConfig);
        res.cookie("authcookie", token, cookieConfig);
        res.status(200).json({ success: true, message: "Login successful", user: { username: user.username, primaryColor: user.color } });
    } catch (error) {
        res.status(500).send("Server error");
    }
});

module.exports = router;