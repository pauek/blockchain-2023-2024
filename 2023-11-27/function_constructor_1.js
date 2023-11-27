let figure = {
  area() {
    return this.width * this.height;
  },
};

function Rectangle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  // Esto no hace falta: this.__proto__ = figure, porque:
  // Javascript rellena __proto__ en cada Rectangle con el contenido de Rectangle.prototype
}
// v1: Rectangle.prototype = figure;
Rectangle.prototype.area = function () {
  return this.width * this.height;
};

let r = new Rectangle(0, 0, 50, 100);
console.log(r.x, r.y, r.width, r.height);
console.log(r.area());
console.log(r.constructor);
