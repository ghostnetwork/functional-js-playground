
immutableArray = function(array) {
  this.prototype = Function.prototype;

  var mutableArray = wrap(array);

  var that = { get length() {return mutableArray.length;} };
  that.prototype = immutableArray.prototype;

  that.itemAtIndex = function(index) { return mutableArray[index]; };

  that.isEmpty = function() { return mutableArray.length == 0; };
  that.isNotEmpty = function() { return that.isEmpty() == false; };
  that.isImmutable = function() { return isImmutable(that); }

  that.forEach = defaultForEach;
  that.every = defaultEvery;
  that.some = defaultSome;
  that.contains = defaultContains;
  that.first = defaultFirst;
  that.last = defaultLast;
  that.mutableCopy = defaultMutableCopy;

  function wrap(array) {
    if (isImmutable(array))
      return wrapImmutableArray(array);
    else
      return wrapArray(array);;
  }

  function wrapArray(array) { return array || []; };
  function wrapImmutableArray(immutable) { return wrapArray(immutable.mutableCopy()); };

  // cribbed from http://goo.gl/LOzO4
  function defaultForEach(fn, scope) {
    var i, len;
    for (i = 0, len = mutableArray.length; i < len; ++i) {
      if (i in mutableArray) {
          fn.call(scope, mutableArray[i], i);
      }
    }
  };

  // cribbed from http://goo.gl/CrjX4
  function defaultEvery(fun /*, thisp */) {
    var t, len, i, thisp;

    t = Object(mutableArray);
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
    var t = Object(mutableArray);
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
    return mutableArray.indexOf(target) != -1;
  }

  function defaultFirst() {
    return that.isNotEmpty() ? mutableArray[0] : undefined;
  }

  function defaultLast() {
    return that.isNotEmpty() ? mutableArray[mutableArray.length - 1] : undefined;
  }

  function defaultMutableCopy() {
    return that.isNotEmpty() ? mutableArray.slice(0) : undefined;
  }

  that.toString = function() { 
    var result = '';
    that.forEach(function(element, index) {
      result += element;
      if (index < mutableArray.length - 1)
        result += ',';
    });
    return result;
  }

  that.concat = function(other) {
    if (other == null || other == undefined) return that;
    var array = mutableArray.concat(other);
    return immutableArray(array);
  };

  // ...
  return that;
};

var isImmutable = function(other) {
  return other ? other.prototype === immutableArray.prototype : false;
};

immutableArray.isImmutable = isImmutable;
