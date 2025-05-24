class Car {
  brand;
  model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model} ${this.speed} km/h ${this.isTrunkOpen}`);
  }

  go() {
    if (!this.isTrunkOpen) {
      if (this.speed >= 0 && this.speed <= 195) {
        this.speed += 5;
      }
    }

  }

  break() {
    if (this.speed >= 5 && this.speed <= 200) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if (!(this.speed >= 1 && this.speed <= 200)) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.isTrunkOpen = undefined;
    this.acceleration = carDetails.acceleration;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model} ${this.speed} km/h`);
  }

  go() {
    if (this.speed >= 0 && this.speed <= 295) {
      this.speed += this.acceleration;
    }
  }

  break() {
    if (this.speed >= 5 && this.speed <= 300) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk');
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk');
  }
}

export const cars = [
  {
    brand: 'Toyota',
    model: 'Corolla'
  },
  {
    brand: 'Tesla',
    model: 'Model 3'
  },
  {
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
  }
].map((carDetails) => {
  if (carDetails.acceleration) {
    return new RaceCar(carDetails);
  }
  else {
    return new Car(carDetails);
  }
});

//console.log(cars);

/*
cars.forEach((carDetails) => {
  carDetails.go();
  carDetails.displayInfo();
  carDetails.go();
  carDetails.break();
  carDetails.displayInfo();
});
*/

/*
cars.forEach((carDetails) => {
carDetails.openTrunk();
carDetails.displayInfo();
carDetails.closeTrunk();
carDetails.displayInfo();
carDetails.break();
carDetails.displayInfo();
carDetails.go();
carDetails.openTrunk();
carDetails.displayInfo();
carDetails.go();
carDetails.displayInfo();
carDetails.break();
carDetails.displayInfo();
carDetails.go();
carDetails.go();
carDetails.displayInfo();
});
*/

//console.log(cars);