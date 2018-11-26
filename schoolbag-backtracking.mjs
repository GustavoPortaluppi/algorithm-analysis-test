export function schoolbagBacktracking(w, total, type) {

  /*
   * Ordenamento de array de acordo com critério
   */

  switch (type) {
    case 'weight':
      w.sort((a, b) => (b.weight > a.weight) ? 1 : ((a.weight > b.weight) ? -1 : 0));
      console.log(w);
      break;
    case 'value':
      w.sort((a, b) => (b.value > a.value) ? 1 : ((a.value > b.value) ? -1 : 0));
      console.log(w);
      break;
    case 'density':
      w.sort((a, b) => ((b.value / b.weight) > (a.value / a.weight)) ? 1 : (((a.value / a.weight) > (b.value / b.weight)) ? -1 : 0));
      console.log(w);
      break;
  }

  const node = { value: 0, left: null, right: null };

  // monta a árvore solução
  makeTree(0, w, node);

  // console.log(JSON.stringify(node, null, '\t'));

  let auxNode = null;
  let diff0 = null;
  let path = [];

  // percorre as folha da árvore solução até encontrar a melhor opção
  // critério utilizado: a melhor folha é aquela com a menor diferença entre 0 e o valor
  // utilização de módulo, para considerar tanto números positivos quanto negativos (árvore simétrica)
  function findLeaf(node) {
    if (node.left && node.right) {
      node.left.parent = node;
      node.right.parent = node;
      findLeaf(node.left);
      findLeaf(node.right);
    } else {
      // console.log(`Folha: ${node.value}`);
      if (diff0 === null) {
        diff0 = Math.abs(total - node.value);
        path = [node.value];
        auxNode = node.parent;
        while (auxNode) {
          path.push(auxNode.value);
          // console.log('> ' + auxNode.value);
          auxNode = auxNode.parent;
        }
      } else if (Math.abs(total - node.value) < diff0) {
        diff0 = Math.abs(total - node.value);
        // console.log(`Menor diferença: ${diff0}`);
        path = [node.value];
        auxNode = node.parent;
        while (auxNode) {
          path.push(auxNode.value);
          // console.log('> ' + auxNode.value);
          auxNode = auxNode.parent;
        }
      }
    }
  }

  findLeaf(node);
  console.log('\nCAMINHO');
  console.log(path);

  // array auxiliar para guardar o caminho da melhor folha até a raiz
  const result = [];

  // função auxiliar para percorrer a árvore da melhor folha até a raiz
  function setResult(index, node) {
    if (node.left && node.right) {
      if (node.left.value === path[index]) {
        result.push('Dentro');
        setResult(index - 1, node.left);
      } else if (node.right.value === path[index]) {
        result.push('Fora');
        setResult(index - 1, node.right);
      }
    }
  }

  setResult(path.length - 2, node);
  console.log('\nRESULTADO');
  console.log(result);

  const bag = [];
  let totalWeight = 0;
  let totalValue = 0;
  // percorre novamente a árvore, agora da raiz até a melhor folha e salva a solução
  for (let x = 0; x < result.length; x += 1) {
    if (result[x] === 'Dentro') {
      totalWeight += w[x].weight;
      totalValue += w[x].value;
      bag.push(w[x]);
    }
  }

  console.log('\n ITENS NA MOCHILA');
  for (const b of bag) {
    console.log(` > ${b.name}: weight: ${b.weight}, value: ${b.value}`);
  }

  console.log(`\n > Total value: ${totalValue}`);
  console.log(` > Total weight: ${totalWeight}`);

}

// monta a árvore solução
export function makeTree(index, w, node) {
  if (index < w.length) {
    // à esquerda: item dentro mochila (peso é somado)
    const left = { value: w[index].weight + node.value, left: null, right: null };
    // à direita: item fora da mochila (peso é ignorado)
    const right = { value: node.value, left: null, right: null };
    node.left = left;
    node.right = right;
    makeTree(index + 1, w, node.left);
    makeTree(index + 1, w, node.right);
  }
}