
/*
Returns an immutableArray filled with the given thing, the given
number of times.
*/
immutableArray.createFilledWith = function(times, thing) {
  var array = [times];
  for (var i = 0; i < times; i++) {
    array[i] = thing;
  };
  return immutableArray(array);
};

/*
Returns an immutableArray containing every other item from the source.
*/
immutableArray.createUsingEveryOtherFrom = function(source) {
  var everyOther = immutableArray.makeEveryOther(2, source);
  return everyOther();
};

/*
Returns a function that returns a function for creating an immutableArray 
containing every other N items from the source.
*/
immutableArray.makeEveryOther = function(n, source) {
  return function(){
    return everyOtherN(n, source)
  };
};

/*
Returns an immutableArray that contains every other N items from sourceArray
*/
var everyOtherN = function(n, sourceArray) {
  var array = [];

  sourceArray.forEach(function(element, index) {
    if (index % n == 0) {
      array.push(element);
    };
  })

  return immutableArray(array);
};
