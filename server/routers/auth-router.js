const express = require("express");
const authRouter = express.Router();
const { compare, hash } = require("../utils/bc");

authRouter.get("/user/id.json", function (req, res) {
    // res.json({
    //     userId: req.session.userId,
    // });
    res.json({ userId: 57 });
});

authRouter.post("/register.json", (req, res) => {
    console.log(req.body);
    res.json({ success: true });
});

module.exports = authRouter;
