const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/app-config");
const User = require("../models/user-model");


// Cookie Validation middleware that is specific to this router
router.use((req, res, next) => {
    try {
        const { authcookie } = req.cookies;

        // Verify token in Cookie
        jwt.verify(authcookie, jwtSecret, (err, data) => {
            if (err) {
                res.status(403).json({ error: true, message: "Please login!" });
            } else if (data?.username) {
                req.username = data?.username;
                next();
            } else {
                res.status(400).json({ error: true, message: "Invalid user or session" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
});

/**
 * @route POST api/update-color
 * @desc Update user preferred Color
 */
router.patch("/", async (req, res) => {
    try {
        // Check if color exists in request
        const { color } = req.body;
        if (!color) {
            return res.status(400).json({ error: true, message: "Please provide a valid color" });
        }
		await User.findOneAndUpdate({ username: req.username }, { color });
        // Send success on color updation
		res.status(200).json({ success: true, primaryColor: color, message: "Preferred color updated successfully" });
    } catch (error) {
        res.status(500).send("Server error");
    }
});

module.exports = router;