function Vehicle(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false;
}

Vehicle.prototype.turnOn = function() {
    if (this.isRunning === true) this.isRunning = false;
}

Vehicle.prototype.turnOn = function () {
    if (this.isRunning === false) this.isRunning = true;
}
Vehicle.prototype.beep = function () {
    if (this.isRunning === true) return "Beep";
}

var car = new Vehicle("toyota", "corolla", 2019);
car.turnOn();
console.log(car.isRunning);