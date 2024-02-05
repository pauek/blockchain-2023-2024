
import { global } from './adams.mjs'; // named exports
import Adams from './adams.mjs'; // default export

// Equivalente a:
// import Adams, { global } from './adams.mjs';

console.log("Global:", global);
console.log("Adams =", Adams);