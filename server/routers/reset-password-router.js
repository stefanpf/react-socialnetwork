const express = require("express");
const resetPasswordRouter = express.Router();
const { hash } = require("../utils/bc");
const db = require("../utils/db");
const { sendEmail } = require("../utils/ses");
const cryptoRandomString = require("crypto-random-string");

resetPasswordRouter.post("/api/password/reset/start", (req, res) => {
    const { email } = req.body;
    if (email != "") {
        db.getUserByEmail(email)
            .then(({ rows }) => {
                if (rows[0].id) {
                    const resetCode = cryptoRandomString({ length: 6 });
                    return db.setResetCode(email, resetCode);
                } else {
                    res.json({ success: false });
                }
            })
            .then(({ rows }) => {
                return sendEmail(
                    email,
                    `Reset your password`,
                    `Your reset code is: ${rows[0].code}`
                );
            })
            .then(() => res.json({ success: true }))
            .catch((err) => {
                console.log("Error in /api/password/reset/start:", err);
                res.json({ success: false });
            });
    } else {
        res.json({ success: false });
    }
});

resetPasswordRouter.post("/api/password/reset/confirm", (req, res) => {
    const { email, password, resetCode: typedResetCode } = req.body;
    if (email != "" && password != "" && typedResetCode != "") {
        db.getResetCode(email)
            .then(({ rows }) => {
                if (typedResetCode === rows[0].code) {
                    return hash(password);
                } else {
                    res.json({ success: false });
                }
            })
            .then((hashedPassword) => {
                return db.updatePassword(email, hashedPassword);
            })
            .then(() => res.json({ success: true }))
            .catch((err) => {
                console.log("Error in /api/password/reset/confirm:", err);
                res.json({ success: false });
            });
    } else {
        res.json({ success: false });
    }
});
module.exports = resetPasswordRouter;
