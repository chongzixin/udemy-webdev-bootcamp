var express = require("express"),
    multer = require("multer");

var router = express.Router();
var upload = multer({dest:'public/uploads/'});
const IMG_FOLDER = "/uploads/";

var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", (req, res) => {
    // List all campgrounds from DB
    Campground.find({}, (err, campgrounds) => {
        if(err) console.log(err);
        else {
            res.render("campgrounds/index", { campgrounds: campgrounds });
        }
    });
});

// insert campground into db, check that user is already logged in
router.post("/", middleware.isLoggedIn, upload.single('campground[image]'), (req, res) => {
    var createdBy = {
        id: req.user.id,
        username: req.user.username
    };
    var newCampground = req.body.campground;
    newCampground.createdBy = createdBy;
    // if the user uploaded an image, use that image instead
    if(req.file)
        newCampground.image = IMG_FOLDER + req.file.filename;

    // insert campground to DB
    Campground.create(newCampground, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
            console.log("successfully added campground: " + campground);
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// show form to create new campground, check that user is already logged in
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// CRITICAL TO PUT /NEW BEFORE /:id OTHERWISE /NEW WILL NEVER BE PROCESSED
router.get("/:id", (req, res) => {
    var id = req.params.id;
    // retrieve the ID from the db
    Campground.findById(id).populate("comments").exec((err, campground) => {
        if (err) console.log(err)
        else {
            res.render("campgrounds/show", { campground: campground });
        }
    });
});

// show form to edit campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    var id = req.params.id;
    // retrieve the ID from the db
    Campground.findById(id, (err, campground) => {
        if (err) res.redirect("/campgrounds");
        else {
            res.render("campgrounds/edit", { campground: campground });
        }
    });
});

// edit the campground
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    var id = req.params.id;
    var newCampground = req.body.campground;
    // retrieve the ID from the db
    Campground.findByIdAndUpdate(id, newCampground, (err, campground) => {
        if (err) console.log(err)
        else {
            res.redirect("/campgrounds/" + id);
        }
    });
});

// delete the campground
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    var id = req.params.id;
    Campground.findByIdAndDelete(id, (err, campground) => {
        if (err) console.log(err)
        else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;