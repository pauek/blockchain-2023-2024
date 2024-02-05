
let agent = {
    name: "James",
    lastName: "Bond",
    age: 27,
    sayHi: function () {
        console.log(`Hi, I am ${this.name}`);
    },
};

function testFunc() {
    console.log(`This is: ${this}`);
}

agent.sayHi(); // 1) There is left object: this = agent
testFunc();    // 2) **NO** left object:       this = undefined 



