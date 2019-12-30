var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {useUnifiedTopology:true});

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email: "jack@beanstalk.edu",
//     name: "Jack and Beanstalk"
// });
// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Just kidding, go to Potions class to learn it!"
// });
// newUser.save((err, user) => {
//     if(err) console.log(err);
//     else console.log(user);
// });

User.findOne({name:"Jack and Beanstalk"}, (err, user) => {
    if(err) console.log(err);
    else {
        console.log(user);
        user.posts.push({
            title: "3 things that I love",
            content: "monkeys, bun, more dinosaurs"
        });
        user.save((err, user) => {
            if(err) console.log(err);
            else console.log(user);
        });
    }
});

// Post.create({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// }, (err, post) => {
//     if(err) console.log(err);
//     else (console.log(post));
// });
