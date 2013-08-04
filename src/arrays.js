
var _Arrays = function() { this.prototype = Function.prototype; };
Arrays = new _Arrays();

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
};

var isImmutable = function(array) { return immutableArray.isImmutable(array); }
Arrays.isImmutable = isImmutable;
