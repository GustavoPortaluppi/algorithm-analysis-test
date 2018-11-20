export function balanceBacktracking(w) {

  const node = { value: 0, esquerda: null, direita: null };

  makeTree(0, w, node);

  // console.log(JSON.stringify(node, null, '\t'));

  let auxNode = null;
  let diff0 = null;
  let path = [];

  function findLeaf(node) {
    if (node.esquerda && node.direita) {
      node.esquerda.parent = node;
      node.direita.parent = node;
      findLeaf(node.esquerda);
      findLeaf(node.direita);
    } else {
      // console.log(`Folha: ${node.value}`);
      if (diff0 === null) {
        diff0 = Math.abs(0 - node.value);
        auxNode = node.parent;
        while (auxNode) {
          // console.log('> ' + auxNode.value);
          auxNode = auxNode.parent;
        }
      } else if (Math.abs(0 - node.value) < diff0) {
        diff0 = Math.abs(0 - node.value);
        // console.log(`Menor diferença: ${diff0}`);
        // path
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
    if (node.esquerda && node.direita) {
      if (node.esquerda.value === path[index]) {
        result.push('E');
        setResult(index - 1, node.esquerda);
      } else if (node.direita.value === path[index]) {
        result.push('D');
        setResult(index - 1, node.direita);
      }
    }
  }

  setResult(path.length - 2, node);
  console.log('\nRESULTADO');
  console.log(result);

}

export function makeTree(index, w, node) {
  if (index < w.length) {
    const esquerda = { value: w[index] + node.value, esquerda: null, direita: null };
    const direita = { value: node.value - w[index], esquerda: null, direita: null };
    node.esquerda = esquerda;
    node.direita = direita;
    makeTree(index + 1, w, node.esquerda);
    makeTree(index + 1, w, node.direita);
  }
}