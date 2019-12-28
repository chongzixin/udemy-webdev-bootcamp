var btnClickMe = document.getElementById("btnClickMe");
var body = document.querySelector("body");

btnClickMe.addEventListener("click", function() {
    body.classList.toggle("newBody");
});