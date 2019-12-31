var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");

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
router.post("/", isLoggedIn, (req, res) => {
    var createdBy = {
        id: req.user.id,
        username: req.user.username
    };
    var newCampground = {name: req.body.name, image: req.body.imgURL, description: req.body.description, createdBy: createdBy};
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
router.get("/new", isLoggedIn, (req, res) => {
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
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
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
router.put("/:id", checkCampgroundOwnership, (req, res) => {
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
router.delete("/:id", checkCampgroundOwnership, (req, res) => {
    var id = req.params.id;
    Campground.findByIdAndDelete(id, (err, campground) => {
        if (err) console.log(err)
        else {
            res.redirect("/campgrounds");
        }
    });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) 
    return next();
    
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
    if(req.isAuthenticated()) {
        var id = req.params.id;
        // retrieve the ID from the db
        Campground.findById(id, (err, campground) => {
            if (err) res.redirect("back");
            else {
                if(campground.createdBy.id.equals(req.user.id)) {
                    next();
                }
                else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;