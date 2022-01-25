const express = require("express");
const wallRouter = express.Router();
const db = require("../utils/db");

wallRouter.post("/api/wall/:id", (req, res) => {
    const { id } = req.params;
    const { author, post } = req.body;
    db.addWallPost(id, author, post)
        .then(({ rows }) => {
            res.json({ postData: rows[0], success: true });
        })
        .catch((err) => {
            console.log("Err in addWallPost:", err);
            res.json({ success: false });
        });
});

wallRouter.get("/api/wall/:id", (req, res) => {
    const { id } = req.params;
    db.getWallPosts(id)
        .then(({ rows }) => {
            res.json({ posts: rows || null, success: true });
        })
        .catch((err) => {
            console.log("Err in getWallPosts:", err);
            res.json({ success: false });
        });
});

wallRouter
    .route("/api/wall/post/:id/like")
    .get((req, res) => {
        db.getLikesForWallPost(req.params.id)
            .then(({ rows }) => {
                if (rows) {
                    res.json({ likes: rows, success: true });
                } else {
                    res.json({ success: true });
                }
            })
            .catch((err) => {
                console.log("Err in getLikesForWallPost:", err);
                res.json({ success: false });
            });
    })
    .post((req, res) => {
        console.log("user wants to like post ", req.params.id);
    })
    .delete((req, res) => {
        console.log("user wants to unlike post ", req.params.id);
    });

module.exports = wallRouter;
