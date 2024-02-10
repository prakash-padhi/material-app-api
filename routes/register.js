const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/user-model");

/**
 * @route POST api/register
 * @desc Create a new user
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

        // Check if username already exists
		const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: true, message: "User already exists" });
        }

        const newUser = new User({ username, password });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        // Send success on new user registration
		res.status(200).json({ success: true, message: "User registered successfully. Please login...!" });
    } catch (error) {
        res.status(500).send("Server error");
    }
});

module.exports = router;