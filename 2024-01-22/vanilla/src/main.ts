import './style.css'
import heroList from './datos.json';

const app = document.getElementById("app")!;

for (const hero of heroList) {
  const div = document.createElement("div");
  div.textContent = `Hero: ${hero.first} ${hero.last} (${hero.age})`;
  app.appendChild(div);
}

let currIndex = 1;
const button = document.querySelector("button")!;
button.addEventListener('click', () => {
  const p = document.createElement("p");
  p.textContent = `Parrafo ${currIndex}`;
  currIndex++;
  document.body.appendChild(p);
});
