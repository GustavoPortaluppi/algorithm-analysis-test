export function balanceBacktracking(w) {

  const node = { value: 0, left: null, right: null };

  makeTree(0, w, node);

  // console.log(JSON.stringify(node, null, '\t'));

  let auxNode = null;
  let diff0 = null;
  let path = [];

  function findLeaf(node) {
    if (node.left && node.right) {
      node.left.parent = node;
      node.right.parent = node;
      findLeaf(node.left);
      findLeaf(node.right);
    } else {
      // console.log(`Folha: ${node.value}`);
      if (diff0 === null) {
        diff0 = Math.abs(0 - node.value);
        path = [node.value];
        auxNode = node.parent;
        while (auxNode) {
          path.push(auxNode.value);
          // console.log('> ' + auxNode.value);
          auxNode = auxNode.parent;
        }
      } else if (Math.abs(0 - node.value) < diff0) {
        diff0 = Math.abs(0 - node.value);
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
    if (node.left && node.right) {
      if (node.left.value === path[index]) {
        result.push('E');
        setResult(index - 1, node.left);
      } else if (node.right.value === path[index]) {
        result.push('D');
        setResult(index - 1, node.right);
      }
    }
  }

  setResult(path.length - 2, node);
  console.log('\nRESULTADO');
  console.log(result);

  const auxLeft = [];
  const auxRight = [];

  for (let x = 0; x < result.length; x += 1) {
    if (result[x] === 'E') {
      auxLeft.push(w[x]);
    } else if (result[x] === 'D') {
      auxRight.push(w[x]);
    }
  }

  let sLeft = '';
  let sRight = '';
  for (const p of auxLeft) {
    sLeft += `  ${p}`;
  }
  for (const p of auxRight) {
    sRight += `  ${p}`;
  }

  console.log(`\n ESQUERDA:${sLeft}`);
  console.log(`  DIREITA:${sRight}`);

}

export function makeTree(index, w, node) {
  if (index < w.length) {
    const left = { value: w[index] + node.value, left: null, right: null };
    const right = { value: node.value - w[index], left: null, right: null };
    node.left = left;
    node.right = right;
    makeTree(index + 1, w, node.left);
    makeTree(index + 1, w, node.right);
  }
}