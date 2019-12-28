var mongoose = require("mongoose");

// connect to the server
// mongo will use the USE command, which means it will create if doesnt exist
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// ADD A NEW CAT TO DB
// (1) in two separate steps
// var george = new Cat({
//     name: "George",
//     age: 11,
//     temperament: "Grouchy"
// });

// george.save((err, cat) => {
//     if(err) {
//         console.log("Something went wrong");
//     } else {
//         console.log("Successfully saved");
//         console.log(cat);
//     }
// });
// (2) in one step only using create()
Cat.create({
    name: "Single Step Cat",
    age: 10,
    temperament: "Bland"
}, (err, cat) => {
    if(err) 
        console.log(err);
    else 
        console.log(cat);
});

// retrieve all cats from the db
Cat.find({}, (err, cats) => {
    if(err) {
        console.log("Error: " + err);
    } else {
        console.log("Listing All Cats");
        console.log(cats);
    }
});