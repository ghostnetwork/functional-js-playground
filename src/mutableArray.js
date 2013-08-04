mutableArray = function(array) {
  this.prototype = Function.prototype;

  var lockedArray = immutableArray(array);
  var that = { get length() {return lockedArray.length;} };

  that.immutableCopy = function() {return immutableArray(lockedArray);};

  that.addElement = function(element) {
    if (notExisty(element)) return lockedArray;

    var mutable = lockedArray.mutableCopy();
    mutable.push(element);
    lockedArray = immutableArray(mutable);
  };

  that.removeElement = function(element) {
    if (notExisty(element)) return lockedArray;

    var mutable = lockedArray.mutableCopy();
    var index = mutable.indexOf(element);
    mutable.splice(index, 1);
    lockedArray = immutableArray(mutable);
  }

  return that;
}