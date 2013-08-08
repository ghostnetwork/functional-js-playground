
(function(exports){
  var util = require('util');

  Arrays = function() { this.prototype = Array.prototype; };

  exports.Arrays = Arrays;

  console.log('Arrays: ' + Arrays);

  // Some aliases
  firstItemFromArray = function(array) { return Arrays.firstItem(array); };
  lastItemFromArray = function(array) {  return Arrays.lastItem(array); };
  rangeOfItemsFromArray = function(array) {  return Arrays.rangeOfItems(array); };
  shuffleArray = function(array) {  return Arrays.shuffle(array); };

  Arrays.firstItem = function(array) { 
    return function() {
      if (isImmutable(array))
        return array.itemAtIndex(0);
      return array[0]; 
    }; 
  };

  Arrays.lastItem = function(array) { 
    return function() { 
      var lastIndex = array.length - 1;
      if (isImmutable(array))
        return array.itemAtIndex(lastIndex);
      return array[lastIndex]; 
    }; 
  };

  Arrays.rangeOfItems = function(array, range) {
    return function() {
      if (notExisty(array) || notExisty(range)) return undefined;
      if (array.length == 0) return [];
      if (range.isNotValidFor(array)) return [];

      var result = new Array(range.length);
      var counter = 0;

      array.forEach(function(element, index) {
        if (range.isWithin(index)) {
          result[counter++] = element;
        };
      });

      return immutableArray(result);
    }
  };

  Arrays.shuffle = function(array) {
    var mutable = isImmutable(array)
      , counter = this.length
      , temp
      , index;

    while (counter) {
      index = Math.floor(Math.random() * counter--);

      temp = this[counter];
      this[counter] = this[index];
      this[index] = temp;
    }

    return this;
  };

  var isImmutable = function(array) { return immutableArray.isImmutable(array); };
  Arrays.isImmutable = isImmutable;

  var isNotImmutable = function(array) { return isImmutable(array) === false; };
  Arrays.isNotImmutable = isNotImmutable;

  exports.test = function(){
    return 'hello world'
  };

})(typeof exports === 'undefined'? this['Arrays']={}: exports);

