'use strict';

(function(exports){

  exports.create = function() { 
    this.prototype = Array.prototype;
    var that = {};
    return that;
  };
  
  var firstItem = function(array){
    return function() {
      if (isImmutable(array))
        return array.itemAtIndex(0);
      return array[0]; 
    };
  };

  var lastItem = function(array) { 
    return function() { 
      var lastIndex = array.length - 1;
      if (isImmutable(array))
        return array.itemAtIndex(lastIndex);
      return array[lastIndex]; 
    }; 
  };

  var rangeOfItems = function(array, range) {
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

      return ImmutableArray.create(result);
    }
  };

  var shuffle = function(array) {
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

  var isImmutable = function(array) { return ImmutableArray.isImmutable(array); };
  var isNotImmutable = function(array) { return isImmutable(array) === false; };

  exports.firstItem = firstItem;
  exports.lastItem = lastItem;
  exports.rangeOfItems = rangeOfItems;
  exports.shuffle = shuffle;
  exports.isImmutable = isImmutable;
  exports.isNotImmutable = isNotImmutable;

})(typeof exports === 'undefined'? this['Arrays']={}: exports);
