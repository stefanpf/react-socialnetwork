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
    console.log(req.body);
    const { first, last, email, password } = req.body;
    if (checkValidEmail(email)) {
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
            });
    } else {
        res.json({ success: false });
    }
});

module.exports = authRouter;
