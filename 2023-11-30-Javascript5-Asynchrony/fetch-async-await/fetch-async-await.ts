
const response = await fetch("https://www.google.com");
const text = await response.text();
console.log(text);

