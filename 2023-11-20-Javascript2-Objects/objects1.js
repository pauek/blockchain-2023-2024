let testObj = {
    "otro campo": true,
};

let person = {
  last: 'Bond',
  first: 'James',
  age: 27
};

// Añadir campos
testObj.a = 1;
testObj.b = "3";
testObj.c = {};
testObj.c.name = "c";
testObj["campo con espacios"] = 27;
testObj["a"] = 11;

// Quitar campos
delete person.age;

for (const prop in testObj) {
    console.log(`Campo "${prop}" =`, testObj[prop]);
}