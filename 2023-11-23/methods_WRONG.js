
let context = this;
context.name = "Tonto quien lo lea";
console.log(context);

let person = {
    name: "Perico de los Palotes",
    sayHi: () => {
        console.log(`Hi, I'm ${this.name}`); // wrong wrong wrong
        // El 'this' se ha cogido del scope global
    }
};

person.sayHi();