import { banknotesGuloso } from './banknotes-guloso';
import { balanceBacktracking } from './balance-backtracking';


/*
 * IMPLEMENTAÇÃO 1
 */

console.log('\n\n----- IMPLEMENTAÇÃO 1 -----');
const p = [2, 2, 5, 5, 5, 5, 5, 10, 10, 10, 10, 20, 20, 50, 50, 50, 100, 100, 100, 100, 100];
console.log(banknotesGuloso(p, 279));


/*
 * IMPLEMENTAÇÃO 2
 */

console.log('\n\n----- IMPLEMENTAÇÃO 2 -----');
const w = [5, 8, 3];
balanceBacktracking(w);