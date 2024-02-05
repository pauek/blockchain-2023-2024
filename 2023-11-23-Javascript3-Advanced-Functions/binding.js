
let mathematician = {
    name: "Hannah Fry",
    sayHi() {
        console.log(`Hi, I'm ${this && this.name}`);
    }
}

let sayHi = mathematician.sayHi;
let hannahFrySayHi = mathematician.sayHi.bind(mathematician);

sayHi();
mathematician.sayHi();
hannahFrySayHi();