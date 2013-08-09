var assert = require('assert');
var should = require('should');
var ImmutableArray = require('../src/immutableArray');

immutableArrayData = function() {
  that = {};

  that.array = ['a', 'b', 'c'];
  that.empty = [];
  that.letters = ['z', 'y', 'x'];
  that.numbers = [1, 2, 3, 4, 5];

  that.createAggregatedLockedArray = function() {
    var sourceArray = that.array.concat(that.numbers).concat(that.letters);
    return ImmutableArray.create(sourceArray);
  }

  that.checkArrayIsEmpty = function(lockedArray) {
    var length = lockedArray.length;
    assert(length === 0);
  };

  that.checkItemAtIndexEqualsItemInArrayAtIndex = function(lockedArray, index) {
    var item = lockedArray.itemAtIndex(index);
    var expectedItem = that.array[index];
    expectedItem.should.equal(item);
  };

  that.isBigEnough = function(element, index, array) {
    assert(array === undefined);
    return (element >= 10);
  };

  that.checkDoesNotContain = function(target) {
    var lockedArray = ImmutableArray.create(that.array);
    var result = lockedArray.contains(target);
    assert(result == false);
  };

  return that;
}