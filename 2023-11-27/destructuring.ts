let rectangle = {
  position: {
    x: 15.0,
    y: 4.5,
  },
  size: {
    width: 50.0,
    height: 150.0,
  },
};

// Destructuring con más profundidad
const {
  position: { x, y },
  size: { width, height },
} = rectangle;

console.log(`Rectangle(${x}, ${y}, ${width}, ${height})`);

let person = {
  name: "James Bond",
  age: 27,
};

// Destructuring con renombrado
let { name: nombre, age: edad } = person;
console.log(`Person(${nombre}, ${edad})`);

// Assemble an object using all fields of another object
let person2 = { married: true, ...person };
console.log(person2);

// Destructuring one field and the rest of fields
const { married, ...rest } = person2;
console.log(married, rest);

// Destructuring an array
const A = [1, 2, 3, 4, 5];
const [_, b] = A;

// Constructing an array from another
const AA = [...A, ...A]; // [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
const [first, ...aRest] = A;
