ImmutableArray = require('../src/immutableArray');

/*
Returns an ImmutableArray filled with the given thing, the given
number of times.
*/
ImmutableArray.createFilledWith = function(times, thing) {
  var array = [times];
  for (var i = 0; i < times; i++) {
    array[i] = thing;
  };
  return ImmutableArray.create(array);
};

/*
Returns an ImmutableArray containing every other item from the source.
*/
ImmutableArray.createUsingEveryOtherFrom = function(source) {
  var everyOther = ImmutableArray.makeEveryOther(2, source);
  return everyOther();
};

/*
Returns a function that returns a function for creating an ImmutableArray 
containing every other N items from the source.
*/
ImmutableArray.makeEveryOther = function(n, source) {
  return function(){
    return everyOtherN(n, source)
  };
};

/*
Returns an ImmutableArray that contains every other N items from sourceArray
*/
var everyOtherN = function(n, sourceArray) {
  var array = [];

  sourceArray.forEach(function(element, index) {
    if (index % n == 0) {
      array.push(element);
    };
  })

  return ImmutableArray.create(array);
};
