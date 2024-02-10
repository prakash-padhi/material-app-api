const express = require("express");
const router = express.Router();

const { cookieConfig } = require("../config/app-config");

/**
 * @route GET api/logout
 * @desc Clear Cookie And Logout the user
 */
router.get("/", async (req, res) => {
    try {
        res.clearCookie("authcookie", cookieConfig).status(200).json({ success: true, isAuthenticated: false, message: "Logout Successful." });
    } catch (error) {
        res.status(500).send("Server error");
    }
});

module.exports = router;