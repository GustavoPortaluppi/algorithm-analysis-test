export function schoolbagBranchAndBoundWeight(w, total) {

  const node = { value: 0, esquerda: null, direita: null };

  makeTree(0, w, node, total);

  // console.log(JSON.stringify(node, null, '\t'));

  let auxNode = null;
  let diff0 = null;
  let path = [];

  function findLeaf(node) {
    // console.log(node.value);
    if (node.esquerda || node.direita) {
      if (node.esquerda) {
        node.esquerda.parent = node;
        findLeaf(node.esquerda);
      }
      if (node.direita) {
        node.direita.parent = node;
        findLeaf(node.direita);
      }
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

  const result = [];

  function setResult(index, node) {
    if (node.esquerda || node.direita) {
      if (node.esquerda && node.esquerda.value === path[index]) {
        result.push('Dentro');
        setResult(index - 1, node.esquerda);
      } else if (node.direita && node.direita.value === path[index]) {
        result.push('Fora');
        setResult(index - 1, node.direita);
      }
    }
  }

  setResult(path.length - 2, node);
  console.log('\nRESULTADO');
  console.log(result);

}

export function makeTree(index, w, node, total) {
  if (index < w.length) {
    const esquerda = { value: w[index].weight + node.value, esquerda: null, direita: null };
    const direita = { value: node.value, esquerda: null, direita: null };
    if (esquerda.value <= total) {
      node.esquerda = esquerda;
      makeTree(index + 1, w, node.esquerda, total);
    }
    if (direita.value <= total) {
      node.direita = direita;
      makeTree(index + 1, w, node.direita, total);
    }
  }
}