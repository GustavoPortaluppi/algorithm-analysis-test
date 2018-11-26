function Item(n, w, v, index) {
  this.name = n;
  this.weight = w;
  this.value = v;
  this.index = index;

  this.print = function () {
    console.log(` > ${this.name}: weight: ${this.weight}, value: ${this.value}`);
  }
}

function Bag(size, dataset) {

  // peso máximo da mochila
  this.size = size;
  // array de controle
  this.itemset = [];
  // array auxiliar para guardar a melhor solução até o momento
  this.currentSolution = [];

  /**
   * popular array de controle
   */
  this.prepare = () => {
    for (let i = 0; i < dataset.length; i += 1) {
      const item = new Item(dataset[i].name, dataset[i].weight, dataset[i].value, i);
      this.itemset.push(item);
    }
    const temp = getRandomAsInt(0, this.itemset.length);

    // gera uma solução aleatória inicial
    this.currentSolution.push(this.getItemBasedOnIndex(this.itemset, temp));
  };

  /**
   * retorna um item do array de controle de acordo com índice desejado
   */
  this.getItemBasedOnIndex = (itemset, index) => {
    let item = null;
    for (const is of itemset) {
      if (is.index === index) {
        item = is;
        break;
      }
    }
    return item;
  };

  /**
   * retorna o weight total do array de controle
   */
  this.getWeightForList = (itemset) => {
    let sum = 0;
    for (const is of itemset) {
      sum += is.weight;
    }
    return sum;
  };

  /**
   * retorna o valor total do array de controle
   */
  this.getValueForList = (itemset) => {
    let sum = 0;
    for (const is of itemset) {
      sum += is.value;
    }
    return sum;
  };

  /**
   * verifica se o array de controle está dentro do peso máximo estipulado
   */
  this.checkoverweight = (itemset) => {
    return this.getWeightForList(itemset) > this.size;
  };

  /**
   * retorna um item aleatório que ainda não esteja no array solução
   */
  this.getRandomItemFromItemSet = () => {
    let temp = getRandomAsInt(0, this.itemset.length);
    let item = this.getItemBasedOnIndex(this.itemset, temp);

    while (this.getItemBasedOnIndex(this.currentSolution, temp) !== null) {
      temp = getRandomAsInt(0, this.itemset.length);
      item = this.getItemBasedOnIndex(this.itemset, temp);
    }

    return item;
  };

  /**
   * gera uma solução vizinha aleatória
   */
  this.modifySelection = () => {
    // salva a solução atual
    let modified = this.currentSolution.slice(0);

    // adiciona um item aleatório que ainda não está na mochila
    const item = this.getRandomItemFromItemSet();
    modified.push(item);

    // checa o peso total da mochila
    // enquanto for maior que o máximo definido, retira um item aleatório
    while (this.checkoverweight(modified)) {
      const dropIndex = getRandomAsInt(0, modified.length);

      let i = 0;
      while (i < modified.length) {
        if (i === dropIndex) {
          modified.splice(i, 1);
        }
        i++;
      }
    }

    return modified;
  };

  /**
   * retorna o espaço restante na mochila de acordo com os itens que já foram adicionados
   */
  this.calculateRemainingSpace = (itemset) => {
    return (this.size - this.getValueForList(itemset));
  };

  this.printsolution = (itemset) => {
    console.log('\n ITENS NA MOCHILA');
    for (const is of itemset) {
      is.print();
    }
    console.log('\n > Total value: ' + this.getValueForList(itemset));
    console.log(' > Total weight: ' + this.getWeightForList(itemset));
  };

  this.prepare();
}

function getRandomAsInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function schoolbagSimulatedAnnealing(itens, MAX_WEIGHT = 100) {

  // valor utilizado como parâmetro para testar as soluções
  let TEMPERATURE = 500;
  // fator de resfriamento
  // fator/limiar utilizado como auxiliar no cálculo da temperatura
  let COOLING_FACTOR = 0.2;

  // calcula a probabilidade de aceitação da solução de acordo com a temperatura
  // relação diretamente proporcional
  // temperatura maior: aceitação com mais facilidade/frequencia
  // temperatura menor: aceitação mais seletiva
  const acceptanceProbability = (freespace, newfreespace, temperature) => {
    return (newfreespace < freespace) ? 1.0 : Math.exp((freespace - newfreespace) / temperature);
  };

  let bag = new Bag(MAX_WEIGHT, itens);

  let best = bag.currentSolution;
  let temperature = TEMPERATURE;

  // enquanto a temperatura for "alta"
  while (temperature > 0) {
    // verifica o espaço restante na mochila
    const freespaceLeft = bag.calculateRemainingSpace(bag.currentSolution);
    // gera uma solução vizinha aleatória
    const modifiedSolution = bag.modifySelection();
    // verifica novamente o espaço restante na mochila
    const newfreespaceleft = bag.calculateRemainingSpace(modifiedSolution);

    // checa a probabilidade de aceitação da solução encontrada
    if (acceptanceProbability(freespaceLeft, newfreespaceleft, temperature) >= Math.random()) {
      // se for o caso, a solução encontrada passa a ser a solução atual
      bag.currentSolution = modifiedSolution;
    }

    // compara o valor total da solução atual com a melhor solução encontrada até o momento
    if (bag.getValueForList(bag.currentSolution) > bag.getValueForList(best)) {
      // se for melhor, a solução atual passa a ser a melhor solução até o momento
      best = bag.currentSolution;
    }

    // diminiu a temperatura de acordo com o fator de resfriamento
    temperature -= COOLING_FACTOR;
  }

  bag.printsolution(best);
}