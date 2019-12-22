var lis = document.querySelectorAll("li");

for(var i=0; i<lis.length; i++) {
    lis[i].addEventListener("mouseover", function() {
        this.classList.add("selected");
    });

    lis[i].addEventListener("mouseout", function () {
        this.classList.remove("selected");
    });

    lis[i].addEventListener("click", function() {
        this.classList.toggle("done");
    });
}


// BORROWING THIS SPACE FOR THE COUNT ALL EVENTS ON MDN EXERCISE
// all tables and each row
var tableTagEvents = document.querySelectorAll("table tbody tr");
// header categories are in h3 p tags after h3
var pTagEvents = document.querySelectorAll("h3 + p code");
// sum them together
var totalEvents = tableTagEvents + pTagEvents;