var app = require("express");
var router = app.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");

// form to add new comments
router.get("/new", isLoggedIn, (req, res) => {
    var id = req.params.id;
    Campground.findById(id, (err, campground) => {
        if(err) console.log(err);
        else {
            res.render("comments/new", { campground: campground });
        }
    });
});

// create a new comment
router.post("/", isLoggedIn, (req, res) => {
    var id = req.params.id;
    var comment = req.body.comment;
    var author = {
        id: req.user.id,
        username: req.user.username
    };
    comment.author = author;
    
    Campground.findById(id, (err, campground) => {
        if(err) console.log(err);
        else {
            Comment.create(comment, (err, comment) => {
                if(err) console.log(err);
                else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + id);
                }
            });
        }
    });
});

// form to edit comments
router.get("/:comment_id/edit", checkCommentOwnership, (req, res) => {
    var comment_id = req.params.comment_id;
    Comment.findById(comment_id, (err, comment) => {
        if(err) console.log(err);
        else {
            res.render("comments/edit", {comment: comment, campground_id: req.params.id});
        }
    });
});

// route to edit comments
router.put("/:comment_id", checkCommentOwnership, (req, res) => {
    var comment_id = req.params.comment_id;
    Comment.findByIdAndUpdate(comment_id, req.body.comment, (err, comment) => {
        if(err) res.redirect("back");
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
    var comment_id = req.params.comment_id;
    Comment.findByIdAndDelete(comment_id, (err, comment) => {
        if(err) res.redirect("back");
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkCommentOwnership(req, res, next) {
    if(req.isAuthenticated()) {
        var comment_id = req.params.comment_id;
        Comment.findById(comment_id, (err, comment) => {
            if(err) {
                res.redirect("back");
            } else {
                if(comment.author.id.equals(req.user.id)) next();
                else res.redirect("back");
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;