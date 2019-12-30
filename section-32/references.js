var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_references", { useUnifiedTopology: true });

var User = require("./models/user");
var Post = require("./models/post");

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Thurthur"
// });

// create the post in db, then find the user in db and associate his post with the created post
// Post.create({
//     title: "one more for youuuu",
//     content: "This brownie not too good"
// }, (err, post) => {
//     if(err) console.log(err);
//     else {
//         User.findOne({name:"Bob Thurthur"}, (err, foundUser) => {
//             foundUser.posts.push(post);
//             foundUser.save((err, user) => {
//                 if(err) console.log(err);
//                 else console.log(user);
//             });
//         });
//     }
// });


// to find a user and populate it with his posts
// the foundUser that is returned contains a user and all his posts
// previously, we only got an array of ObjectIds
User.findOne({ name: "Bob Thurthur" }).populate("posts").exec((err, foundUser) => {
    if(err) console.log(err);
    else console.log(foundUser);
});