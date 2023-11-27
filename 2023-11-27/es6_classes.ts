
class PersonTs {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static fromJson(json: Record<string, any>) {
    let person = new PersonTs(json["firstName"], json["lastName"]);
    return person;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(fullName: string) {
    const [first, last] = fullName.split(' ');
    this.firstName = first;
    this.lastName = last;
  }

  sayHi() {
    console.log(`Hi, my name is ${this.fullName}`);
  }
}

let p = new PersonTs("Slim", "Shady");
p.sayHi();

let json = { firstName: "James", lastName: "Bond" };
let p2 = PersonTs.fromJson(json);
p2.sayHi();

console.log(p2.fullName);
p2.fullName = "Jamie Bond";
console.log(p2);