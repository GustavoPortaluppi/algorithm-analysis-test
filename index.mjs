import { banknotesGuloso } from './banknotes-guloso';
import { balanceBacktracking } from './balance-backtracking';
import { schoolbagBacktrackingWeight } from './schoolbag-backtracking-weight';
import { schoolbagBacktrackingValue } from './schoolbag-backtracking-value';
import { schoolbagBacktrackingDensity } from './schoolbag-backtracking-density';
import { schoolbagBranchAndBoundWeight } from './schoolbag-branch-and-bound-weight';
import { schoolbagBranchAndBoundValue } from './schoolbag-branch-and-bound-value';
import { schoolbagBranchAndBoundDensity } from './schoolbag-branch-and-bound-density';
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
console.log('       ----------- Problema da balança ------------\n');
balanceBacktracking(pesos);

console.log('\n\n       ----- IMPLEMENTAÇÃO 2.2 | Backtracking -----');
console.log('       ------- Problema da mochila por PESO -------\n');
schoolbagBacktrackingWeight(itensMochila, vTotalMochila);

console.log('\n\n       ----- IMPLEMENTAÇÃO 2.3 | Backtracking -----');
console.log('       ------ Problema da mochila por VALOR -------\n');
schoolbagBacktrackingValue(itensMochila, vTotalMochila);

console.log('\n\n       ----- IMPLEMENTAÇÃO 2.4 | Backtracking -----');
console.log('       ----- Problema da mochila por DENSIDADE ----\n');
schoolbagBacktrackingDensity(itensMochila, vTotalMochila);

/*
 * IMPLEMENTAÇÃO 3
 */

console.log('\n\n       ----- IMPLEMENTAÇÃO 3.1 | Branch and Bound -----');
console.log('       --------- Problema da mochila por PESO ---------\n');
schoolbagBranchAndBoundWeight(itensMochila, vTotalMochila);

console.log('\n\n       ----- IMPLEMENTAÇÃO 3.2 | Branch and Bound -----');
console.log('       -------- Problema da mochila por VALOR ---------\n');
schoolbagBranchAndBoundValue(itensMochila, vTotalMochila);

console.log('\n\n       ----- IMPLEMENTAÇÃO 3.3 | Branch and Bound -----');
console.log('       ------ Problema da mochila por DENSIDADE -------\n');
schoolbagBranchAndBoundDensity(itensMochila, vTotalMochila);

/*
 * IMPLEMENTAÇÃO 4
 */

console.log('\n\n       ----- IMPLEMENTAÇÃO 4.1 | Simulated Annealing -----');
console.log('       --------------- Problema da mochila ---------------\n');
schoolbagSimulatedAnnealing(itensMochila, vTotalMochila);

