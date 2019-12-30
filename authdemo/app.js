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
app.use(bodyParser.urlencoded({ extended: true }));
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

// auth routes
app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    User.register(new User({username: username}), password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render("register");
        } 
        // log the user in
        passport.authenticate("local")(req, res, () => {
            res.redirect("/secret");
        });
    });
});

app.listen(3000, () => {
    console.log("server has started");
});