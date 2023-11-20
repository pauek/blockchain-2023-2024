
function esPrimo2(n: number): boolean {
    for (let d = 2; d*d <= n; d++) {
        if (n % d === 0) {
            return false;
        }
    }
    return n > 1;
}

function mostrarPrimos2(howMany: number) {
    let n = 2, count = 0;
    let primes: number[] = [];
    while (count < howMany) {
        if (esPrimo2(n)) {
            primes.push(n);
            count++;
        }
        n++;
    }
    return primes;
}

let primos = mostrarPrimos2(1000);
for (const primo of primos) {
    process.stdout.write(`${primo} `);
}