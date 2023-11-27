let animal = {
  name: "Animal",
  eat() { console.log(`I'm a ${this.name}: Nyam nyam`); },
  isAnimal: true,
  grow() {
    this.age++;
  },
  sleep() {
    this.sleeping = true;
  }
};

let rabbit = {
  name: "Rabbit",
  jump() {
    console.log(`I'm a ${this.name}: Boing!`);
  },
};

let BugsBunny = {
  name: "Bugs Bunny",
  age: 7,
  __proto__: rabbit,
  jump() {
    console.log(`Boing Boing!`);
  },
}

animal.eat();
rabbit.jump();
console.log(rabbit.isAnimal);

rabbit.__proto__ = animal;
rabbit.eat();

BugsBunny.eat();
BugsBunny.jump();

console.log(BugsBunny.age);
BugsBunny.grow();
console.log(BugsBunny.age);
BugsBunny.sleep();
console.log(BugsBunny);