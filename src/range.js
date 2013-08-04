
Range = function(start, end, mutable) { 
  var that = createRange(start, end, mutable);

  that.equals = equals;
  that.toString = toString;

  that.createMutableCopy = function() { return Range(that.start, that, end, true); };

  return that;
};

Range.clone = function(otherRange) {
  if (notExisty(otherRange)) return undefined;
  return Range(otherRange.start, otherRange.end);
};

var createRange = function(start, end, mutable) { 
  var _start = start;
  var _end = end;

  var range;

  if (mutable) {
    range = { start: _start, end: _end, isMutable: true };
  }
  else {
    range = {
      get start() {return _start;},
      get end() {return _end;},
      get isMutable() {return false;}
    };
  }

  return range;
};

var createMutableCopy = function(sourceRange) {
  return { start: sourceRange.start, end: sourceRange.end };
};

var equals = function(otherRange) {
  if (notExisty(otherRange)) return false;
  return this.start === otherRange.start && this.end === otherRange.end;
};

var toString = function() {
  return 'start: ' + this.start + ', end: ' + this.end;
};
