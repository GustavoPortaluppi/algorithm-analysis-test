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

  this.size = size;
  this.itemset = [];
  this.currentSolution = [];

  /**
   * Populates the itemset with the dataset provided above
   */
  this.prepare = () => {
    for (let i = 0; i < dataset.length; i += 1) {
      const item = new Item(dataset[i].name, dataset[i].weight, dataset[i].value, i);
      this.itemset.push(item);
    }
    const temp = getRandomAsInt(0, this.itemset.length);
    this.currentSolution.push(this.getItemBasedOnIndex(this.itemset, temp));
  };

  /**
   * Gets the items from the itemset provided as an argument based on the index
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
   * Calculates and returns the summation of list of item weights
   */
  this.getWeightForList = (itemset) => {
    let sum = 0;
    for (const is of itemset) {
      sum += is.weight;
    }
    return sum;
  };

  /**
   * Calculates and returns the summation of list of item values
   */
  this.getValueForList = (itemset) => {
    let sum = 0;
    for (const is of itemset) {
      sum += is.value;
    }
    return sum;
  };

  /**
   * Checks whether current selection is overweight or not
   */
  this.checkoverweight = (itemset) => {
    return this.getWeightForList(itemset) > this.size;
  };

  /**
   * Returns any random item from the itemset which is not in the currentSolution of the bag
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
   * Modifies the current selection
   */
  this.modifySelection = () => {
    let modified = this.currentSolution.slice(0);

    const item = this.getRandomItemFromItemSet();
    modified.push(item);

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
   * Calculates the remaining space in the bag
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

  let TEMPERATURE = 500;
  let COOLING_FACTOR = 0.2;

  const acceptanceProbability = (freespace, newfreespace, temperature) => {
    return (newfreespace < freespace) ? 1.0 : Math.exp((freespace - newfreespace) / temperature);
  };

  let bag = new Bag(MAX_WEIGHT, itens);

  let best = bag.currentSolution;
  let temperature = TEMPERATURE;

  while (temperature > 0) {
    const freespaceLeft = bag.calculateRemainingSpace(bag.currentSolution);
    const modifiedSolution = bag.modifySelection();
    const newfreespaceleft = bag.calculateRemainingSpace(modifiedSolution);

    if (acceptanceProbability(freespaceLeft, newfreespaceleft, temperature) >= Math.random()) {
      bag.currentSolution = modifiedSolution;
    }

    if (bag.getValueForList(bag.currentSolution) > bag.getValueForList(best)) {
      best = bag.currentSolution;
    }

    temperature -= COOLING_FACTOR;
  }

  bag.printsolution(best);
}