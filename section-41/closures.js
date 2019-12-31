function outer() {
    var data = "hello from the "
    return function () {
        return data + " other side...";
    }
}

console.log(outer()());