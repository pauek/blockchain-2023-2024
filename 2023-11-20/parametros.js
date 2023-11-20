
function showParams(a, b, c, d = "flappy") {
    console.log(`showParams(${a}, ${b}, ${c}, ${d})`);
}

function logaritmo(x, base = 10.0) {
}

showParams();
showParams(1);
showParams(1, "sdf");
showParams(null, "", []);
showParams(1, 2, 3, true);
showParams(1, 2, 3, 4, 5);


