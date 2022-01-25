const express = require("express");
const compression = require("compression");
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret:
        process.env.SESSION_SECRET ||
        require("../secrets").COOKIE_SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});
const path = require("path");
const authRouter = require("./routers/auth-router");
const friendshipRouter = require("./routers/friendship-router");
const resetPasswordRouter = require("./routers/reset-password-router");
const userRouter = require("./routers/user-router");
const wallRouter = require("./routers/wall-router");
const db = require("./utils/db");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
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
app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

// ROUTES
app.use(authRouter);
app.use(friendshipRouter);
app.use(resetPasswordRouter);
app.use(userRouter);
app.use(wallRouter);
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// START SERVER
server.listen(process.env.PORT || PORT, function () {
    console.log("I'm listening.");
});

// WEBSOCKET SETUP
io.on("connection", (socket) => {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    db.getLastTenChatMessages()
        .then(({ rows }) => {
            rows.map(
                (row) =>
                    (row.created_at = new Intl.DateTimeFormat("en-GB", {
                        dateStyle: "long",
                        timeStyle: "short",
                    }).format(new Date(row.created_at)))
            );
            socket.emit("chatMessages", rows);
        })
        .catch((err) => {
            console.log("Err in getLastTenChatMessages:", err);
        });

    socket.on("newChatMessage", (message) => {
        let newChatMessage = {
            user_id: socket.request.session.userId,
            message,
        };
        db.addChatMessage(newChatMessage.user_id, newChatMessage.message)
            .then(({ rows }) => {
                let { id, created_at } = rows[0];
                created_at = new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "long",
                    timeStyle: "short",
                }).format(new Date(created_at));
                newChatMessage = { ...newChatMessage, id, created_at };
                return db.getUserById(newChatMessage.user_id);
            })
            .then(({ rows }) => {
                const { first, last, image_url } = rows[0];
                newChatMessage = { ...newChatMessage, first, last, image_url };
                io.emit("chatMessage", newChatMessage);
            })
            .catch((err) => {
                console.log("Err in addChatMessage:", err);
            });
    });
});
