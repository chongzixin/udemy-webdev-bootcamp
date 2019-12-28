var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var campgrounds = [
    { name: "Rush Creek", image: "https://www.newzealand.com/assets/Operator-Database/38ae3fb282/img-1536202934-9872-13211-p-10A3A8A0-0C1B-DD66-3F2B0682F6AD2E05-2544003__FocalPointCropWzQyNyw2NDAsNTIsNDMsODUsImpwZyIsNjUsMi41XQ.JPG"},
    { name: "Grounds of Yosemite", image: "https://www.newzealand.com/assets/Operator-Database/38ae3fb282/img-1536202934-9872-13211-p-10A3A8A0-0C1B-DD66-3F2B0682F6AD2E05-2544003__FocalPointCropWzQyMCw5NjAsNTIsNDMsNzUsImpwZyIsNjUsMi41XQ.JPG" },
    { name: "LokLok KokKok", image: "https://media-cdn.tripadvisor.com/media/photo-s/02/9e/b9/18/site-35.jpg" },
    { name: "MidSomewhere", image: "https://q-xx.bstatic.com/xdata/images/hotel/840x460/207057591.jpg?k=24ac028e448fd5bf553ed758a4cb66909e55ed1e902e8777635767151be96ebb&o="},
    { name: "Rush Creek", image: "https://www.newzealand.com/assets/Operator-Database/38ae3fb282/img-1536202934-9872-13211-p-10A3A8A0-0C1B-DD66-3F2B0682F6AD2E05-2544003__FocalPointCropWzQyNyw2NDAsNTIsNDMsODUsImpwZyIsNjUsMi41XQ.JPG" },
    { name: "Grounds of Yosemite", image: "https://www.newzealand.com/assets/Operator-Database/38ae3fb282/img-1536202934-9872-13211-p-10A3A8A0-0C1B-DD66-3F2B0682F6AD2E05-2544003__FocalPointCropWzQyMCw5NjAsNTIsNDMsNzUsImpwZyIsNjUsMi41XQ.JPG" },
    { name: "LokLok KokKok", image: "https://media-cdn.tripadvisor.com/media/photo-s/02/9e/b9/18/site-35.jpg" },
    { name: "Rush Creek", image: "https://www.newzealand.com/assets/Operator-Database/38ae3fb282/img-1536202934-9872-13211-p-10A3A8A0-0C1B-DD66-3F2B0682F6AD2E05-2544003__FocalPointCropWzQyNyw2NDAsNTIsNDMsODUsImpwZyIsNjUsMi41XQ.JPG" },
    { name: "Grounds of Yosemite", image: "https://www.newzealand.com/assets/Operator-Database/38ae3fb282/img-1536202934-9872-13211-p-10A3A8A0-0C1B-DD66-3F2B0682F6AD2E05-2544003__FocalPointCropWzQyMCw5NjAsNTIsNDMsNzUsImpwZyIsNjUsMi41XQ.JPG" },
    { name: "LokLok KokKok", image: "https://media-cdn.tripadvisor.com/media/photo-s/02/9e/b9/18/site-35.jpg" }
];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

// add home page. welcome, signup button, contact page

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/campgrounds", (req, res) => {
    res.render("campground", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    var newCampground = { name: req.body.name, image: req.body.image };
    campgrounds.push(newCampground);
    
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});

app.listen(3000, () => {
    console.log("server started running...");
});