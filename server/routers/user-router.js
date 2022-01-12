const express = require("express");
const userRouter = express.Router();
// const { compare, hash } = require("../utils/bc");
const db = require("../utils/db");
// const { checkValidEmail } = require("../utils/helper-functions");

userRouter.get("/user/:id", (req, res) => {
    db.getUserById(req.params.id).then(({ rows }) => {
        if (rows) {
            res.json(rows[0]);
        } else {
            res.json({ success: false });
        }
    });
});

module.exports = userRouter;
