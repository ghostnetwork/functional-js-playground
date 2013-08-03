
immutableArray = function(array) {
  var lockedArray = array || [];
  var that = { get length() {return lockedArray.length;} };
  that.prototype = immutableArray.prototype;

  that.itemAtIndex = function(index) { return lockedArray[index]; };

  that.isEmpty = function() { return lockedArray.length == 0; };
  that.isNotEmpty = function() { return that.isEmpty() == false; };

  that.forEach = defaultForEach;
  that.every = defaultEvery;
  that.some = defaultSome;
  that.contains = defaultContains;
  that.first = defaultFirst;
  that.last = defaultLast;
  that.mutableCopy = defaultMutableCopy;

  // cribbed from http://goo.gl/LOzO4
  function defaultForEach(fn, scope) {
    var i, len;
    for (i = 0, len = lockedArray.length; i < len; ++i) {
      if (i in lockedArray) {
          fn.call(scope, lockedArray[i], i);
      }
    }
  };

  // cribbed from http://goo.gl/CrjX4
  function defaultEvery(fun /*, thisp */) {
    var t, len, i, thisp;

    t = Object(lockedArray);
    len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    thisp = arguments[1];
    for (i = 0; i < len; i++) {
      if (i in t && !fun.call(thisp, t[i], i)) {
        return false;
      }
    }

    return true;
  };

  // cribbed from http://goo.gl/SO15V
  function defaultSome(fun /*, thisp */) {
    var t = Object(lockedArray);
    var len = t.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t && fun.call(thisp, t[i], i))
        return true;
    }

    return false;
  };

  function defaultContains(target) {
    return lockedArray.indexOf(target) != -1;
  }

  function defaultFirst() {
    return that.isNotEmpty() ? lockedArray[0] : undefined;
  }

  function defaultLast() {
    return that.isNotEmpty() ? lockedArray[lockedArray.length - 1] : undefined;
  }

  function defaultMutableCopy() {
    return that.isNotEmpty() ? lockedArray.slice(0) : undefined;
  }

  that.toString = function() { 
    var result = '';
    that.forEach(function(element, index) {
      result += element;
      if (index < lockedArray.length - 1)
        result += ',';
    });
    return result;
  }

  that.concat = function(other) {
    if (other == null || other == undefined) return that;
    var array = lockedArray.concat(other);
    return immutableArray(array);
  };

  // ...
  return that;
};

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
Returns a function that returns an immutableArray containing every other N item
from the source.
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

immutableArray.prototype = Function.prototype;
