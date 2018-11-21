export function schoolbagBranchAndBoundWeight(w, total) {

  /*
   * Ordenamento de array por peso
   */
  w.sort((a, b) => {
    return a.weight < b.weight;
  });

  const node = { value: 0, left: null, right: null };

  makeTree(0, w, node, total);

  // console.log(JSON.stringify(node, null, '\t'));

  let auxNode = null;
  let diff0 = null;
  let path = [];

  function findLeaf(node) {
    // console.log(node.value);
    if (node.left || node.right) {
      if (node.left) {
        node.left.parent = node;
        findLeaf(node.left);
      }
      if (node.right) {
        node.right.parent = node;
        findLeaf(node.right);
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
    if (node.left || node.right) {
      if (node.left && node.left.value === path[index]) {
        result.push('Dentro');
        setResult(index - 1, node.left);
      } else if (node.right && node.right.value === path[index]) {
        result.push('Fora');
        setResult(index - 1, node.right);
      }
    }
  }

  setResult(path.length - 2, node);
  console.log('\nRESULTADO');
  console.log(result);

  const bag = [];
  for (let x = 0; x < result.length; x += 1) {
    if (result[x] === 'Dentro') {
      bag.push(w[x]);
    }
  }

  console.log('\n ITENS NA MOCHILA');
  for (const b of bag) {
    console.log(` > ${b.name}: weight: ${b.weight}, value: ${b.value}`);
  }
}

export function makeTree(index, w, node, total) {
  if (index < w.length) {
    const left = { value: w[index].weight + node.value, left: null, right: null };
    const right = { value: node.value, left: null, right: null };
    if (left.value <= total) {
      node.left = left;
      makeTree(index + 1, w, node.left, total);
    }
    if (right.value <= total) {
      node.right = right;
      makeTree(index + 1, w, node.right, total);
    }
  }
}