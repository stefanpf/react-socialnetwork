const express = require("express");
const userRouter = express.Router();
const db = require("../utils/db");
const { uploader } = require("../utils/upload");
const s3 = require("../utils/s3");

userRouter.get("/user/:id", (req, res) => {
    db.getUserById(req.params.id)
        .then(({ rows }) => {
            if (rows) {
                res.json({
                    success: true,
                    first: rows[0].first,
                    last: rows[0].last,
                    imageUrl: rows[0].image_url,
                    email: rows[0].email,
                });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("Error in getUserById:", err);
            res.json({ success: false });
        });
});

userRouter.post(
    "/user/upload/:id",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        if (req.file) {
            let newImage = {
                userId: req.params.id,
                url: `https://spsocialeu.s3.eu-central-1.amazonaws.com/${req.file.filename}`,
            };
            db.addImageUrl(newImage.userId, newImage.url)
                .then(res.json({ imageUrl: newImage.url, success: true }))
                .catch((err) => {
                    console.log("Error in addImageUrl:", err);
                    res.json({ success: false });
                });
        } else {
            res.json({ success: false });
        }
    }
);

module.exports = userRouter;
