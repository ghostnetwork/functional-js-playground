
(function(exports){
  'use strict';

  var ImmutableArrayPrototype = {};

  exports.create = function(array) { 
    this.prototype = Function.prototype;

    var mutableArray = wrap(array);

    var that = { get length() {return mutableArray.length;} };
    that.prototype = ImmutableArrayPrototype;

    that.itemAtIndex = function(index) { return mutableArray[index]; };

    that.isEmpty = function() { return mutableArray.length === 0; };
    that.isNotEmpty = function() { return that.isEmpty() === false; };
    that.isImmutable = function() { return true; };

    that.concat = function(other) {
      if (other === null || other === undefined) return that;
      var clone = mutableArray.concat(other);
      return exports.create(clone);
    };

    that.toString = function() { 
      var result = '';
      that.forEach(function(element, index) {
        result += element;
        if (index < mutableArray.length - 1)
          result += ',';
      });
      return result;
    };

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
        return wrapArray(array);
    }
    function wrapArray(array) { return array || []; }
    function wrapImmutableArray(immutable) { return wrapArray(immutable.mutableCopy()); }

    // cribbed from http://goo.gl/LOzO4
    function defaultForEach(fn, scope) {
      var i, len;
      for (i = 0, len = mutableArray.length; i < len; ++i) {
        if (i in mutableArray) {
            fn.call(scope, mutableArray[i], i);
        }
      }
    }

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
    }

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
    }

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
    
    return that;
  };

  function isImmutable(other) {
    var result = false;

    if (existy(other) && existy(other.prototype))
      result = other.prototype === ImmutableArrayPrototype;

    return result;
  }

  exports.isImmutable = isImmutable;

})(typeof exports === 'undefined'? this.ImmutableArray={}: exports);
