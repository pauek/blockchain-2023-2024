
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function () {
  console.log(`Hi, I'm ${this.name}`);
}


function Superhero(name, hero) {
  this.name = name;
  this.hero = hero;
  // this.__proto__ = Superhero.prototype
}
Superhero.prototype.breakThroughWall = function () {
  console.log(`Look! ${this.hero} broke through a wall!`);
}

// Intrucción mágica que produce la herencia Superhero -> Person
Superhero.prototype.__proto__ = Person.prototype;


let mrIncredible = new Superhero("Bob Parr", "Mr. Incredible");
mrIncredible.breakThroughWall();
mrIncredible.sayHi();