var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hi there!");
});

app.get("/bye", function(req, res) {
    res.send("Good bye!");
});

app.get("/dog", function(req, res) {
    res.send("MEOW!");
});

// route parameters
app.get("/r/:subreddit", function(req, res) {
    res.send("The param is " + req.params.subreddit);
});

app.get("/r/:subreddit/comments/:id/:title", function(req, res) {
    console.log(req.params);
});

// catch all mechanism. NOTE THAT order of it matters.
app.get("*", function(req, res) {
    res.send("anywhere else");
});

// start the server.
app.listen(3000, function() {
    console.log("server has started");
});