const express = require("express");
const compression = require("compression");
const cookieSession = require("cookie-session");
const path = require("path");
const authRouter = require("./routers/auth-router");
const app = express();
const PORT = 3001;

// MIDDLEWARE
if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}
app.use(
    cookieSession({
        secret:
            process.env.SESSION_SECRET ||
            require("./secrets").COOKIE_SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);
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
