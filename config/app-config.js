const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	mongoUri: process.env.MONGO_URI,
	PORT: process.env.PORT,
	jwtSecret: process.env.JWT_SECRET,
	UIAppUrl: process.env.FRONTEND_APP_URL,
	cookieConfig: {
		maxAge: 86400000,
		httpOnly: true,
		path: "/",
		sameSite: "none",
		secure: process.env.NODE_ENV === "production",
		...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN })
	}
};