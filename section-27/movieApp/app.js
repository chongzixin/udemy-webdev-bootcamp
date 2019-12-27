const express = require("express");
const rp = require("request-promise");

const app = express();

app.set("view engine", "ejs");

// Search Form: return list of results
// GENERAL SEARCH: http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb
// SEARCH WITH MOVIEID: http://www.omdbapi.com/?i=tt3896198&apikey=thewdb

var options = {
    method: "GET",
    uri: "http://www.omdbapi.com/",
    qs: {
        apikey: "thewdb"
    }
};

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/find", (req, res) => {
    const movieName = req.query.movieName;
    // set the query string for search, remove for imdb
    options.qs.s = movieName;
    options.qs.i = null;

    rp(options)
    .then((body) => {
        const data = JSON.parse(body);
        res.render("search", {movies: data});
    })
    .catch((error) => {
        console.log(error);
    });
});

// load and show movie details
app.get("/details/:imdbID", (req, res) => {
    const imdbID = req.params.imdbID;
    // set the query string for imdb, remove for search
    options.qs.i = imdbID;
    options.qs.s = null;

    rp(options)
    .then((body) => {
        const movieDetails = JSON.parse(body);
        console.log(movieDetails);
        res.render("details", { movieDetails: movieDetails});
    })
    .catch((error) => {
        console.log(error);
    });
});

app.listen(3000, function() {
    console.log("starting server...");
});