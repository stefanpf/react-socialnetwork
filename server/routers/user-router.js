const express = require("express");
const userRouter = express.Router();
const db = require("../utils/db");
const { uploader } = require("../utils/upload");
const s3 = require("../utils/s3");

userRouter
    .route("/api/user/:id/")
    .get((req, res) => {
        db.getUserById(req.params.id)
            .then(({ rows }) => {
                if (rows) {
                    res.json({
                        success: true,
                        userData: {
                            first: rows[0].first,
                            last: rows[0].last,
                            imageUrl: rows[0].image_url,
                            email: rows[0].email,
                            bio: rows[0].bio,
                        },
                    });
                } else {
                    res.json({ success: false });
                }
            })
            .catch((err) => {
                console.log("Error in getUserById:", err);
                res.json({ success: false });
            });
    })
    .delete(s3.remove, (req, res) => {
        const userId = req.params.id;
        db.deleteWallPostLikesByUserId(userId)
            // .then(() => {
            //     return db.getWallPostLikesMadeByOtherUsers(userId);
            // })
            .then(() => {
                // let postIds = [];
                // rows.forEach((row) => postIds.push(row.id));
                return db.deleteWallPostLikesOnUsersPosts(userId);
            })
            .then(() => {
                return db.deleteChatMessagesByUserId(userId);
            })
            .then(() => {
                return db.deleteWallPostsByUserId(userId);
            })
            .then(() => {
                return db.deleteFriendshipsByUserId(userId);
            })
            .then(() => {
                return db.deletePasswordResetCodesByUserId(userId);
            })
            .then(() => {
                return db.deleteUserByUserId(userId);
            })
            .then(() => {
                req.session = null;
                res.json({ success: true });
            })
            .catch((err) => {
                console.log("Err in account deletion:", err);
                res.json({ success: false });
            });
    });

userRouter.post(
    "/api/user/upload/:id",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        if (req.file) {
            let newImage = {
                userId: req.params.id,
                url: `https://spsocialeu.s3.eu-central-1.amazonaws.com/${req.params.id}/${req.file.filename}`,
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

userRouter
    .route("/api/user/profile/:id")
    .get((req, res) => {
        db.getUserBio(req.params.id)
            .then(({ rows }) => {
                res.json({
                    ...rows[0],
                    success: true,
                });
            })
            .catch((err) => {
                console.log("Error in getUserBio:", err);
                res.json({ success: false });
            });
    })
    .post((req, res) => {
        const { bioDraft: userBio } = req.body;
        db.addUserBio(req.params.id, userBio)
            .then(res.json({ success: true }))
            .catch((err) => {
                console.log("Error in addUserBio:", err);
                res.json({ success: false });
            });
    });

userRouter.get("/api/find", async (req, res) => {
    const { user } = req.query;
    if (!user) {
        res.sendStatus(200);
    } else {
        try {
            const { rows: users } =
                user === "newest"
                    ? await db.getNewestUsers()
                    : await db.getUsersByName(user);
            res.json({ success: true, users });
        } catch (err) {
            console.log("Error in getUsersByName:", err);
            res.json({ success: false });
        }
    }
});

module.exports = userRouter;
