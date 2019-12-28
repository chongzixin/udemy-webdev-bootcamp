var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// MONGODB
mongoose.connect("mongodb://localhost/yelpcamp", {useNewUrlParser: true, useUnifiedTopology: true});
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// ROUTES
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/campgrounds", (req, res) => {
    // List all campgrounds from DB
    Campground.find({}, (err, campgrounds) => {
        if(err) console.log(err);
        else {
            res.render("campground", { campgrounds: campgrounds });
        }
    });
});

app.post("/campgrounds", (req, res) => {
    // insert campground to DB
    Campground.create({
        name: req.body.name,
        image: req.body.imgURL
    }, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Successfully created campground: " + campground);
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});

app.listen(3000, () => {
    console.log("server started running...");
});