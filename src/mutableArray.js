mutableArray = function(array) {
  this.prototype = Function.prototype;

  var lockedArray = ImmutableArray.create(array);
  var that = { get length() {return lockedArray.length;} };

  that.immutableCopy = function() {return ImmutableArray.create(lockedArray);};

  that.addElement = function(element) {
    if (notExisty(element)) return lockedArray;

    var mutable = lockedArray.mutableCopy();
    mutable.push(element);
    lockedArray = ImmutableArray.create(mutable);
  };

  that.removeElement = function(element) {
    if (notExisty(element)) return lockedArray;

    var mutable = lockedArray.mutableCopy();
    var index = mutable.indexOf(element);
    mutable.splice(index, 1);
    lockedArray = ImmutableArray.create(mutable);
  }

  return that;
}