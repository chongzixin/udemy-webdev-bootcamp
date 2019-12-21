var firstName = prompt("What's your first name?");
var lastName = prompt("What's your last name?");
var age = prompt("How old are you?");

console.log("User's name is " + firstName + " " + lastName);
console.log("User's age is " + age);

// function factorial(x) {
//     if (x === 0) return 1;
//     count = x * factorial(--x);
//     return count;
// }

// function kebabToSnake(str) {
//     return str.replace("-", "_");
// }

// function printReverse(arr) {
//     console.log(arr.reverse());
// }

// CHECK WHETHER ALL VARIABLES IN ARRAY ARE SAME
// function isUniform(arr) {
//     var value = true;
//     arr.forEach(function(item) {
//         if(item !== arr[0]) {
//             value=false;
//             return;
//         }
//     });
//     return value;
// }

// function sumArray(arr) {
//     var sum = 0;
//     arr.forEach(function(i) {
//         sum += i;
//     });
//     return sum;
// }

// CREATES OUR OWN VERSION OF A FOREACH
// function myForEach(arr, func) {
//     for(var i=0; i<arr.length; i++) {
//         func(arr[i]);
//     }
// }

// // MAKE THIS INTO AN ARRAY FUNCTION
// Array.prototype.myForEach = function(func) {
//     for(var i=0; i<this.length; i++) {
//         func(this[i]);
//     }
// }

var movieArray = [
    {
        title: "Jumanji",
        rating: 4,
        hasWatched: true
    },
    {
        title: "King Arthur",
        rating: 4,
        hasWatched: true
    },
    {
        title: "Frozen 2",
        rating: 3,
        hasWatched: false
    },
    {
        title: "Godfather",
        rating: 5,
        hasWatched: true
    },
    {
        title: "Indiana Jones",
        rating: 1,
        hasWatched: false
    }
];

movieArray.forEach(function(movie) {
    if(movie.hasWatched) {
        console.log("You have watched \"" + movie.title + "\" - " + movie.rating + " stars");
    } else {
        console.log("You have not watched \"" + movie.title + "\" - " + movie.rating + " stars");
    }
});