
let datoss = {
    color: "red",
    height: 200,
    width: 500,
    border: true,
    backgroundImage: "landscape.jpg"
}

await Bun.write("datoss.json", JSON.stringify(datoss));