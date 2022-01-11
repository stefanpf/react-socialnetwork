const express = require("express");
const authRouter = express.Router();
const { compare, hash } = require("../utils/bc");
const db = require("../utils/db");
const { checkValidEmail } = require("../utils/helper-functions");

authRouter.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

authRouter.post("/register.json", (req, res) => {
    const { first, last, email, password } = req.body;
    if (checkValidEmail(email) && first != "" && last != "" && password != "") {
        hash(password)
            .then((hashedPassword) => {
                return db.addUser(
                    first.trim(),
                    last.trim(),
                    email.toLowerCase().trim(),
                    hashedPassword
                );
            })
            .then(({ rows }) => {
                req.session = { userId: rows[0].id };
                res.json({ success: true });
            })
            .catch((err) => {
                console.log("Err in registration process:", err);
                res.json({ success: false });
            });
    } else {
        res.json({ success: false });
    }
});

authRouter.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

module.exports = authRouter;
