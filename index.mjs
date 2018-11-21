import { banknotesGuloso } from './banknotes-guloso';
import { balanceBacktracking } from './balance-backtracking';
import { schoolbagBacktrackingWeight } from './schoolbag-backtracking-weight';
import { schoolbagBranchAndBoundWeight } from './schoolbag-branch-and-bound-weight';
import { schoolbagSimulatedAnnealing } from './schoolbag-simulated-annealing';
import { cedulas, itensMochila, pesos, vTotalCedulas, vTotalMochila } from './utils';

/*
 * IMPLEMENTAÇÃO 1
 */

console.log('\n\n       ----- IMPLEMENTAÇÃO 1 | Guloso -----');
console.log('       ------- Problema das cédulas -------\n');
console.log(banknotesGuloso(cedulas, vTotalCedulas));

/*
 * IMPLEMENTAÇÃO 2
 */

console.log('\n\n       ----- IMPLEMENTAÇÃO 2.1 | Backtracking -----');
console.log('       ---------- Problema da balança -----------\n');
balanceBacktracking(pesos);

console.log('\n\n       ----- IMPLEMENTAÇÃO 2.2 | Backtracking -----');
console.log('       ------ Problema da mochila por PESO ------\n');
schoolbagBacktrackingWeight(itensMochila, vTotalMochila);

/*
 * IMPLEMENTAÇÃO 3
 */

console.log('\n\n       ----- IMPLEMENTAÇÃO 3 | Branch and Bound -----');
console.log('       -------- Problema da mochila por PESO --------\n');
schoolbagBranchAndBoundWeight(itensMochila, vTotalMochila);

/*
 * IMPLEMENTAÇÃO 4
 */
console.log('\n\n       ----- IMPLEMENTAÇÃO 4.1 | Simulated Annealing -----');
console.log('       --------------- Problema da mochila ---------------\n');
schoolbagSimulatedAnnealing(itensMochila, vTotalMochila);

