
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

  that.forEach = mozillaForEach;
  that.every = mozillaEvery;
  that.some = mozillaSome;
  that.contains = defaultContains;
  that.first = defaultFirst;

  that.isEmpty = function() { return lockedArray.length == 0; };
  that.isNotEmpty = function() { return that.isEmpty() == false; };

  // cribbed from http://goo.gl/LOzO4
  function mozillaForEach(fn, scope) {
    var i, len;
    for (i = 0, len = lockedArray.length; i < len; ++i) {
      if (i in lockedArray) {
          fn.call(scope, lockedArray[i], i);
      }
    }
  };

  // cribbed from http://goo.gl/CrjX4
  function mozillaEvery(fun /*, thisp */) {
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
  function mozillaSome(fun /*, thisp */) {
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

  // ...
  return that;
};

