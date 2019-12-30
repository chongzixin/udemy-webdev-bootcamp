var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    ExpressSession = require("express-session"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app", {useUnifiedTopology:true, useNewUrlParser:true});

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(ExpressSession({
    secret: "Thur likes to eat bread",
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", isLoggedIn, (req, res) => {
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

// login routes
app.get("/login", (req, res) => {
    res.render("login");
});

// passport.authenticate acts as middleware
// it's basically something that gets perform between the beginning and callback of the route
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,(req, res) => {

});

// logout
app.get("/logout", (req, res) => {
    // passport just destroys all your session variables
    req.logout();
    res.redirect("/");
});

// standard for all middlewares to have 3 arguments
// next is the next thing to be called
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, () => {
    console.log("server has started");
});