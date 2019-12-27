// USING REQUESTS
// var request = require("request");
// request("https://jsonplaceholder.typicode.com/users", (error, response, body) => {
//     if (!error && response.statusCode == 200) {
//         const data = JSON.parse(body);
//         var str = "";
//         data.forEach(function (user) {
//             str += user.address.geo.lat + " ";
//         });

//         console.log(str);
//     }
// });

// USING REQUEST-PROMISES in ES6
// in most use cases, you will define a options object to store tokens etc, then do rp(options);
const rp = require("request-promise");
rp("https://jsonplaceholder.typicode.com/users")
.then((htmlString) => {
    const data = JSON.parse(htmlString);
    var str = "";
    data.forEach(function (user) {
        str += user.address.geo.lat + " ";
    });
    console.log(str);
})
.catch((err) => {
    console.log(err);
});