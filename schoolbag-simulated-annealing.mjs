/**
 * Will hold each knapsack item
 */
function Item(w, v, index) {
  this.weight = w; //Weight of the item
  this.value = v;  //Weight of the value
  this.index = index; //Index of the value
  this.print = function () {
    console.log('Item : w : ' + this.weight + ', v : ' + this.value + '');
  }
}


/**
 * Knapsack bag
 */
function Bag(size, dataset) {

  this.size = size;
  this.itemset = []; //Will hold the overall dataset
  this.currentSolution = []; //will hold the current solution

  /**
   * Populates the itemset with the dataset provided above
   */
  this.prepare = function () {
    for (var i = 0; i < dataset.length; i++) {
      var item = new Item(dataset[i][0], dataset[i][1], i);
      this.itemset.push(item);
    }
    var temp = getRandomAsInt(0, this.itemset.length);
    this.currentSolution.push(this.getItemBasedOnIndex(this.itemset, temp));
  }

  /**
   * Gets the items from the itemset provided as an argument based on the index
   */
  this.getItemBasedOnIndex = function (itemset, index) {
    var item = null;
    for (var i = 0; i < itemset.length; i++) {
      if (itemset[i].index == index) {
        item = itemset[i];
        break;
      }
    }
    return item;
  }

  /**
   * Calculates and returns the summation of list of item weights
   */
  this.getWeightForList = function (itemset) {
    var sum = 0;
    for (var i = 0; i < itemset.length; i++) {
      sum += itemset[i].weight;
    }
    return sum;
  }

  /**
   * Calculates and returns the summation of list of item values
   */
  this.getValueForList = function (itemset) {
    var sum = 0;
    for (var i = 0; i < itemset.length; i++) {
      sum += itemset[i].value;
    }
    return sum;
  }

  /**
   * Checks whether current selection is overweight or not
   */
  this.checkoverweight = function (itemset) {
    if (this.getWeightForList(itemset) > this.size) {
      return true;
    } else
      return false;
  }

  /**
   * Returns any random item from the itemset which is not in the currentSolution of the bag
   */
  this.getRandomItemFromItemSet = function () {
    var temp = getRandomAsInt(0, this.itemset.length);
    var item = this.getItemBasedOnIndex(this.itemset, temp);
    while (this.getItemBasedOnIndex(this.currentSolution, temp) != null) {
      temp = getRandomAsInt(0, this.itemset.length);
      item = this.getItemBasedOnIndex(this.itemset, temp);
    }
    return item;
  }

  /**
   * Modifies the current selection
   */
  this.modifySelection = function () {
    var modified = this.currentSolution.clone();
    var item = this.getRandomItemFromItemSet();
    modified.push(item);
    while (this.checkoverweight(modified)) {
      var dropIndex = getRandomAsInt(0, modified.length);
      modified.removeItem(dropIndex);
      console.log(dropIndex);
      console.log(modified);

    }
    return modified;
  }

  /**
   * Calculates the remaining space in the bag
   */
  this.calculateRemainingSpace = function (itemset) {
    return (this.size - this.getValueForList(itemset));
  }

  this.printsolution = function (itemset) {
    for (var i = 0; i < itemset.length; i++) {
      var item = itemset[i];
      item.print();
    }
    console.log('Total value is : ' + this.getValueForList(itemset));
  }

  this.prepare();
}

/**
 * Returns a random number between minimum (inclusive) and maximum (exclusive)
 */
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between minimum (inclusive) and maximum (exclusive)
 */
function getRandomAsInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

Array.prototype.clone = function () {
  return this.slice(0);
};

Array.prototype.removeItem = function (index) {
  var i = 0;
  while (i < this.length) {
    if (i == index) {
      this.splice(i, 1);
    }
    i++;
  }
};


export function schoolbagSimulatedAnnealing() {


  // let MAX_WEIGHT = 15;
  let MAX_WEIGHT = 100;
  let TEMPERATURE = 500;
  let COOLING_FACTOR = 0.2;

  // let dataset = [
  //   [1, 2], [4, 2], [5, 4], [3, 6], [9, 4], [10, 8], [8, 5], [6, 7], [7, 3], [11, 8]
  // ];

  let dataset = [
    [100, 40], [50, 35], [45, 18], [20, 4], [10, 10], [5, 2]
  ];

  function acceptanceProbability(freespace, newfreespace, temperature) {
    if (newfreespace < freespace) {
      return 1.0;
    }
    return Math.exp((freespace - newfreespace) / temperature);
  }


  let bag = new Bag(MAX_WEIGHT, dataset);

  var best = bag.currentSolution;
  var temperature = TEMPERATURE;
  while (temperature > 0) {
    var freespaceLeft = bag.calculateRemainingSpace(bag.currentSolution);
    var modifiedSolution = bag.modifySelection();
    var newfreespaceleft = bag.calculateRemainingSpace(modifiedSolution);
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