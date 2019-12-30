var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    localStrategy = require("passport-local"),
    expressSession = require("express-session"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app", {useUnifiedTopology:true, useNewUrlParser:true});

var app = express();
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession({
    secret: "Thur likes to eat bread",
    resave: false,
    saveUninitialized: false
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", (req, res) => {
    res.render("secret");
});

app.listen(3000, () => {
    console.log("server has started");
});