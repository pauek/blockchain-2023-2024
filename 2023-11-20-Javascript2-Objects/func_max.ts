
function max2(a: number, b: number): number {
    let x = 3; // variable local
    return (a > b ? a : b);
}

function añade_valor(array: number[], valor: number) {
    array.push(valor);
}

let A = [1, 2, 3];
añade_valor(A, 4);
console.log(A);