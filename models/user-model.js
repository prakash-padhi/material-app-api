const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "#033363"
    }
});

module.exports = User = mongoose.model("users", UserSchema);