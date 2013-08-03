
immutableArray = function(array) {
  var lockedArray = array || [];
  var that = {
    get length() {return lockedArray.length;},
  };
  
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
        result += ', ';
    });
    return result;
  }

  // ...
  return that;
};

