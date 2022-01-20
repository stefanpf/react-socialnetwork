const express = require("express");
const friendshipRouter = express.Router();
const db = require("../utils/db");

friendshipRouter.get("/api/friend/:id", (req, res) => {
    const loggedInUser = req.session.userId;
    const otherUser = req.params.id;
    db.getFriendshipStatus(loggedInUser, otherUser)
        .then(({ rows }) => {
            res.json({ friendship: rows[0] || null, success: true });
        })
        .catch((err) => {
            console.log("Err in getFriendshipStatus:", err);
            res.json({ success: false });
        });
});

friendshipRouter.post("/api/friend/add/:id", (req, res) => {
    const loggedInUser = req.session.userId;
    const otherUser = req.params.id;
    db.makeFriendRequest(loggedInUser, otherUser)
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("Err in makeFriendRequest:", err);
            res.json({ success: false });
        });
});

friendshipRouter.post("/api/friend/cancel/:id", (req, res) => {
    const loggedInUser = req.session.userId;
    const otherUser = req.params.id;
    db.cancelFriendRequestOrEndFriendShip(loggedInUser, otherUser)
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("Err in cancelFriendRequestOrEndFriendship:", err);
            res.json({ success: false });
        });
});

friendshipRouter.post("/api/friend/accept/:id", (req, res) => {
    const loggedInUser = req.session.userId;
    const otherUser = req.params.id;
    db.acceptFriendRequest(loggedInUser, otherUser)
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("Err in acceptFriendRequest:", err);
            res.json({ success: false });
        });
});

friendshipRouter.get("/api/get-friends-and-requests", (req, res) => {
    const { userId } = req.session;
    db.getFriendsAndRequestsByUserId(userId)
        .then(({ rows }) => {
            res.json({ friendsAndRequests: rows, success: true });
        })
        .catch((err) => {
            console.log("Err in getFriendsAndRequestsByUserId:", err);
            res.json({ success: false });
        });
});

friendshipRouter.get("/api/get-friends", (req, res) => {
    const { userId } = req.session;
    db.getFriendsByUserId(userId)
        .then(({ rows }) => {
            res.json({ friends: rows, success: true });
        })
        .catch((err) => {
            console.log("Err in getFriendsByUserId:", err);
            res.json({ success: false });
        });
});

module.exports = friendshipRouter;
