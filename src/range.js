'use strict';

(function(exports){

  exports.create = function(start, end, mutable) { 
    this.prototype = Function.prototype;
    var _start = start
      , _end = end
      , _mutable = mutable || false;

    var that = createRange(start, end, mutable);

    that.equals = function(otherRange) {
      if (notExisty(otherRange)) return false;
      return this.start === otherRange.start && this.end === otherRange.end;
    };

    that.createMutableCopy = function() {
      return createRange(that.start, that.end, true);
    };

    that.isWithin = function(index) { 
      return index >= that.start && index < that.end; 
    };

    that.isValidFor = function(array) {
      return that.start >= 0 
          && that.end >= 0 
          && that.end <= array.length;
    };
    that.isNotValidFor = function(array) { return that.isValidFor(array) == false; };

    that.toString = function() {
      return 'start: ' + this.start + ', end: ' + this.end;
    };

    function rangeLength(start, end) { return end - start; };

    function createRange(start, end, mutable) { 
      var range;

      if (mutable) {
        range = { 
          start: _start, 
          end: _end, 
          isMutable: true,
          get length() {  return rangeLength(range.start, range.end); }
        };
      }
      else {
        range = {
          get start() {return _start;},
          get end() {return _end;},
          get isMutable() {return false;},
          get length() { return rangeLength(start, end); }
        };
      }

      return range;
    };

    return that;
  };
  
  exports.clone = function(otherRange) {
    if (notExisty(otherRange)) return undefined;
    return exports.create(otherRange.start, otherRange.end);
  };

  exports.EmptyRange = function() { 
    var that = exports.create(0, 0);
    return that;
  };

})(typeof exports === 'undefined'? this['Range']={}: exports);
