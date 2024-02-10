const mongoose = require("mongoose");
const { mongoUri } = require("../config/app-config");

const connectDB = () => {
	try {
		mongoose.connect(mongoUri).then(() => console.log("DATABASE CONNECTED"));
	} catch (err) {
		console.log(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;