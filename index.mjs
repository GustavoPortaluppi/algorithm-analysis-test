import { banknotesGuloso } from './banknotes-guloso';
import { balanceBacktracking } from './balance-backtracking';
import { schoolbagBacktrackingWeight } from './schoolbag-backtracking-weight';
import { schoolbagBranchAndBoundWeight } from './schoolbag-branch-and-bound-weight';
import { schoolbagSimulatedAnnealing } from './schoolbag-simulated-annealing';
import { knapsackSimulatedAnnealing } from './knapsack-simulated-annealing';
import { cedulas, itens, w } from './utils';


/*
 * IMPLEMENTAÇÃO 1
 */

console.log('\n\n       ----- IMPLEMENTAÇÃO 1 | Guloso -----');
console.log('       ------- Problema das cédulas -------\n');
console.log(banknotesGuloso(cedulas, 279));


/*
 * IMPLEMENTAÇÃO 2
 */

console.log('\n\n       ----- IMPLEMENTAÇÃO 2.1 | Backtracking -----');
console.log('       ---------- Problema da balança -----------\n');
balanceBacktracking(w);

console.log('\n\n       ----- IMPLEMENTAÇÃO 2.2 | Backtracking -----');
console.log('       ------ Problema da mochila por PESO ------\n');
schoolbagBacktrackingWeight(itens, 100);

/*
 * IMPLEMENTAÇÃO 3
 */

console.log('\n\n       ----- IMPLEMENTAÇÃO 3 | Branch and Bound -----');
console.log('       -------- Problema da mochila por PESO --------\n');
schoolbagBranchAndBoundWeight(itens, 100);

/*
 * IMPLEMENTAÇÃO 4
 */
console.log('\n\n       ----- IMPLEMENTAÇÃO 4.1 | Backtracking -----');
console.log('       ---------- Problema da mochila -----------\n');
schoolbagSimulatedAnnealing();

console.log('\n\n       ----- IMPLEMENTAÇÃO 4.2 | Backtracking -----');
console.log('       ---------- Problema da mochila -----------\n');
knapsackSimulatedAnnealing();

