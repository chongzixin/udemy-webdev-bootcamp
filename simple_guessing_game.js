// SIMPLE GUESSING GAME
// var correct = 10;

// while(guess !== correct) {
//     var guess = prompt("Guess a number!");

//     if(guess < correct)
//         alert("too low");
//     else if (guess > correct)
//         alert("too high");
//     else {
//         alert("correct!");
//         break;
//     }
// }

// WHILE LOOPS EXERCISE

// print all numbers between -10 and 19
// var number = -10;
// while(number < 20) {
//     console.log(number);
//     number++;
// }

// print all even numbers between 10 and 40
// var number = 10;
// while(number <= 40) {
//     if(number % 2 === 0) console.log(number);
//     number++;
// }

// console.log("for loop")
// for(var number=10; number <= 40; number++) {
//     if(number % 2 === 0) console.log(number);
// }

// print all odd numbers between 300 and 333
// var number = 300;
// while(number <= 333) {
//     if(number % 2 !== 0) console.log(number);
//     number++;
// }

// console.log("for loop");
// for(var number = 300; number <= 333; number++) {
//     if(number % 2 !== 0) console.log(number);
// }

// print all numbers divisible by 5 and 3 between 5 and 30
var number = 5;
while(number <= 50) {
    if(number % 5 === 0 && number % 3 === 0) console.log(number);
    number++;
}

console.log("for loop");
for(var number=5; number <= 50; number++) {
    if(number % 5 === 0 && number % 3 === 0) console.log(number);
}