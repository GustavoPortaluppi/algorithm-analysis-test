export function schoolbagBacktrack(w) {

  const node = { value: 0, esquerda: null, direita: null };

  // test(w[0], node);
  // test(w[1], node.esquerda);
  // test(w[1], node.direita);

  let auxNodeEsquerda = null;
  // auxNodeEsquerda = node;
  let auxNodeDireita = null;
  auxNodeDireita = node;

  for (let x = 0; x < w.length; x += 1) {
    console.log(w[x]);

    if (x === 0) {
      test(w[x], node);
      auxNodeEsquerda = node.esquerda;
      auxNodeDireita = node.direita;
    } else {
      for (let y = 0; y < 1; y += 1)  {
        console.log('aaa');
        test(w[x], auxNodeEsquerda);
        auxNodeEsquerda = auxNodeEsquerda.esquerda;

        test(w[x], auxNodeDireita);
        auxNodeDireita = auxNodeDireita.direita;
      }
    }



    // auxNodeEsquerda.esquerda = test2(w[x], auxNodeEsquerda);
    // auxNodeEsquerda = auxNodeEsquerda.esquerda;

    // if (node.esquerda && node.direita) {
    //   // test(w[x], auxNodeEsquerda);
    //   // auxNodeEsquerda = auxNodeEsquerda.esquerda;
    //   // test(w[x], auxNodeDireita);
    //   // auxNodeDireita = auxNodeDireita.direita;
    // } else {
    //   test(w[x], node);
    //   // auxNodeEsquerda = node.esquerda;
    //   // auxNodeDireita = node.direita;
    // }
  }

  console.log(JSON.stringify(node, null, '  '));

}

export function test(w, node) {
  const esquerda = { value: w + node.value, esquerda: null, direita: null };
  const direita = { value: node.value - w, esquerda: null, direita: null };
  node.esquerda = esquerda;
  node.direita = direita;
}

export function test2(w, node) {
  return { value: w + node.value, esquerda: null, direita: null };
}

export function test3(w, node) {

}