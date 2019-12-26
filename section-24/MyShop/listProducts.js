var faker = require('faker');

for(var i=1; i<=10; i++) {
    var randomProduct = faker.commerce.productName();
    var randomPrice = faker.commerce.price();

    console.log(i + ": " + randomProduct + " costs $" + randomPrice);
}