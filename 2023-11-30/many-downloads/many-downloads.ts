/*

Código secuencial:

for (let i = 1; i <= 5; i++) {
  const response = await fetch(`https://xkcd.com/${i}`);
  const text = await response.text();
  console.log(text.length);
}

*/

async function getXkcdText(n: number) {
  const response = await fetch(`https://xkcd.com/${n}`);
  const text = await response.text();
  return text;
}

const promises = [1, 2, 3 ,4, 5].map((n) => getXkcdText(n));
const texts = await Promise.allSettled(promises);
for (const text of texts) {
  if (text.status === "fulfilled") {
    console.log(text.value.length);
  } else {
    console.error("There was an error", text.reason);
  }
}