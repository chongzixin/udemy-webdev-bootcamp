const express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MONGOOSE - connect, create schema, model
mongoose.connect("mongodb://localhost:27017/blog", {useNewUrlParser: true, useUnifiedTopology: true});
const blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "data:image/jpeg;base64,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",
//     body: "This is a test blog"
// })

// ROUTES
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) console.log(err);
        else res.render("index", {"blogs": blogs});
    });
});

// display the form
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// insert it into db
app.post("/blogs", (req, res) => {
    var newBlog = req.body.blog;
    Blog.create(newBlog, (err, blog) => {
        if(err) {
            console.log(err);
            res.redirect("/blogs/new");
        } else
            res.redirect("/");
    });
});

// show specific details of post
app.get("/blogs/:id", (req, res) => {
    // retrieve from db based on id then send to details page
    var id = req.params.id;
    Blog.findById(id, (err, blog) => {
        if(err) res.redirect("/blogs");
        else res.render("show", {"blog": blog});
    });
});

app.listen(3000, () => {
    console.log("server has started...");
});