const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const connectDB = require("./db/db-connect");
const { PORT, UIAppUrl } = require("./config/app-config");

// Connect MongoDB
connectDB();

// Init Express JSON Middleware
app.use(express.json({ extended: false }));

console.log("UIAppUrl ==>", UIAppUrl);

// Init CORS Middleware
app.use(cors({ origin: UIAppUrl, credentials: true }));

// Init Cookie Parser Middleware
app.use(cookieParser());

// API Endpoints
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/auth-status", require("./routes/auth-status"));
app.use("/api/logout", require("./routes/logout"));
app.use("/api/update-color", require("./routes/update-color"));



// App Port Number Either from .env file or default 8080
const APP_PORT = PORT || 8080;

app.listen(APP_PORT, () => {
    console.log(`Server is running on PORT: ${APP_PORT}`);
});