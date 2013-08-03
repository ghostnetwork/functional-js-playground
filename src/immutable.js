
immutable = function(thing) {
  var that = {};
  that.value = function() { return thing; };
  return that;
};

var myArray;

immutableArray = function(array) {
  var that = {};
  var lockedArray = array || [];

  that.count = function() { return lockedArray.length; };
  that.itemAtIndex = function(index) { return lockedArray[index]; };

  // cribbed from http://goo.gl/LOzO4
  that.forEach = function(fn, scope) {
    var i, len;
    for (i = 0, len = lockedArray.length; i < len; ++i) {
        if (i in lockedArray) {
            fn.call(scope, lockedArray[i], i);
        }
    }
  };
  
  // that.every = function(action) {
  // };

  return that;
};
