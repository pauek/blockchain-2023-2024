
class EPerson {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

class ESuperhero extends EPerson {
  hero: string;

  constructor(name: string, hero: string) {
    super(name);
    this.hero = hero;
  }

  breakThroughWall() {
    console.log(`Look! ${this.hero} broke through a wall!`);
  }
}

let mrI = new ESuperhero("Bob Parr", "Mr. Incredible");
mrI.sayHi();
mrI.breakThroughWall();

