var express = require("express"),
    ExpressSession = require("express-session"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds.js");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds.js"),
    indexRoutes = require("./routes/index.js");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// PASSPORT CONFIG
app.use(express.static(__dirname + "/public"));
app.use(ExpressSession({
    secret: "Thur likes to read",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// this is a middleware that will send req.user to every route (res)
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// seedDB(); // seed the database

// MONGODB
mongoose.connect("mongodb://localhost:27017/yelpcamp", {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(3000, () => {
    console.log("server started running...");
});