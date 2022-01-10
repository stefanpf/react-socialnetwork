const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

app.post("/register.json", (req, res) => {
    console.log(req.body);
    res.json({ success: true });
});

app.get("/user/id.json", function (req, res) {
    // res.json({
    //     userId: req.session.userId,
    // });
    res.json({ userId: 57 });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
