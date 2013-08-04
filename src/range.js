
Range = function(start, end, mutable) { 
  var that = createRange(start, end, mutable);

  that.equals = equals;
  that.toString = toString;

  that.createMutableCopy = function() { return Range(that.start, that.end, true); };
  that.isWithin = function(index) { return index >= that.start && index < that.end; };

  that.isValidFor = function(array) {
    return that.start >= 0 
        && that.end >= 0 
        && that.end <= array.length;
  };
  that.isNotValidFor = function(array) { return that.isValidFor(array) == false; };

  return that;
};

Range.clone = function(otherRange) {
  if (notExisty(otherRange)) return undefined;
  return Range(otherRange.start, otherRange.end);
};

EmptyRange = function() { 
  var that = Range(0, 0);
  return that;
};

var createRange = function(start, end, mutable) { 
  var _start = start;
  var _end = end;

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

var createMutableCopy = function(sourceRange) {
  return createRange(sourceRange.start, sourceRange.end, true);
};

var equals = function(otherRange) {
  if (notExisty(otherRange)) return false;
  return this.start === otherRange.start && this.end === otherRange.end;
};

var toString = function() {
  return 'start: ' + this.start + ', end: ' + this.end;
};

var rangeLength = function(start, end) {
  return end - start;
};
