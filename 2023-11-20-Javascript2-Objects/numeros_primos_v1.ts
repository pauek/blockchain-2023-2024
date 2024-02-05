
function esPrimo(n: number): boolean {
    for (let d = 2; d*d <= n; d++) {
        if (n % d === 0) {
            return false;
        }
    }
    return n > 1;
}
type EsPrimoType = (n: number) => boolean;

function mostrarPrimos(howMany: number): void {
    let n = 2, count = 0;
    while (count < howMany) {
        if (esPrimo(n)) {
            console.log(n);
            count++;
        }
        n++;
    }
}
type MostrarPrimos = (howMany: number) => void;

mostrarPrimos(100000);