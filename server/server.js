const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const authRouter = require("./routers/auth-router");
const PORT = 3001;

// MIDDLEWARE
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

// ROUTES
app.use(authRouter);
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// START SERVER
app.listen(process.env.PORT || PORT, function () {
    console.log("I'm listening.");
});
