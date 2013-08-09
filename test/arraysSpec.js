'use strict';

var assert = require('assert');
var util = require('util');

require('../src/predicates');

require('./immutableArrayData');
var data = immutableArrayData();

var Arrays = require('../src/arrays');
require('../src/immutableArray');
require('../src/range');

describe('arrays', function(){
  describe('Arrays', function(){
    it('should be able to be accessed', function(){
      assert(Arrays != null);
    });
  });
  
  describe('#first', function(){
    it('should return undefined if the array is empty', function(){
      var array = [];
      var firstObjFunc = Arrays.firstItem(array);
      var firstObj = firstObjFunc();
      assert(firstObj === undefined);
    });

    it('should return the first item from a non-empty array', function(){
      var firstObjFunc = Arrays.firstItem(data.array);
      var firstObj = firstObjFunc();
      assert(firstObj !== undefined);

      var expected = data.array[0];
      assert(firstObj === expected);
    });

    it('should work when given an immutableArray', function(){
      var lockedArray = data.createAggregatedLockedArray();
      var firstItem = lockedArray.itemAtIndex(0);
      var result = Arrays.firstItem(lockedArray)();
      assert(result === firstItem);
    });
  });

  describe('#last', function(){
    it('should return undefined if the array is empty', function(){
      var array = [];
      var lastObjFunc = Arrays.lastItem(array);
      var lastObj = lastObjFunc();
      assert(lastObj === undefined);
    });

    it('should return the last item from a non-empty array', function(){
      var lastObjFunc = Arrays.lastItem(data.array);
      var lastObj = lastObjFunc();
      assert(lastObj !== undefined);

      var expected = data.array[data.array.length - 1];
      assert(lastObj === expected);
    });

    it('should work when given an immutableArray', function(){
      var lockedArray = data.createAggregatedLockedArray();
      var lastItem = lockedArray.itemAtIndex(lockedArray.length - 1);
      var result = Arrays.lastItem(lockedArray)();
      assert(result === lastItem);
    });
  });

  describe('#rangeOfItems', function(){
    it('should return undefined if either array or range are notExisty', function(){
      var result = Arrays.rangeOfItems()();
      assert(result == undefined);

      result = Arrays.rangeOfItems(null)();
      assert(result == undefined);

      result = Arrays.rangeOfItems(undefined, null)();
      assert(result == undefined);

      result = Arrays.rangeOfItems(undefined, undefined)();
      assert(result == undefined);

      result = Arrays.rangeOfItems(null, null)();
      assert(result == undefined);
    });

    it('should return an empty array if the given array is empty', function(){
      var range = Range(0, 5);
      var result = Arrays.rangeOfItems(data.empty, range)();
      assert(result.length == 0);
    });

    it('should return an array containing the items in the expected range from the given array', function(){
      var range = Range(0, 3);
      var lockedArray = Arrays.rangeOfItems(data.numbers, range)();
      assert(lockedArray.length > 0);
      assert(lockedArray.length == range.length);
      assert(lockedArray.itemAtIndex(0) === data.numbers[range.start]);
    });

    it('should return an empty array if the range is not within the given array', function(){
      var rangeStartTooLow = Range(-1, 3);
      var result = Arrays.rangeOfItems(data.numbers, rangeStartTooLow);
      assert(result.length == 0);

      var rangeStartTooHigh = Range(5, 10);
      result = Arrays.rangeOfItems(data.letters, rangeStartTooHigh);
      assert(result.length == 0);

      var rangeEndTooLow = Range(-1, 4);
      result = Arrays.rangeOfItems(data.letters, rangeEndTooLow);
      assert(result.length == 0);

      var rangeEndTooHigh = Range(5, 100);
      result = Arrays.rangeOfItems(data.letters, rangeEndTooLow);
      assert(result.length == 0);
    });

    it('should work when given an immutableArray', function(){
      var lockedArray = data.createAggregatedLockedArray();
      var range = Range(4, 11);
      var rangeArray = Arrays.rangeOfItems(lockedArray, range)();
      assert(lockedArray.length > 0);
    });
  });

  describe('#isImmutable', function(){
    it('should return false if the given array is undefined', function(){
      var result = Arrays.isImmutable();
      assert(result == false);
    });

    it('should return false if the given array is null', function(){
      var result = Arrays.isImmutable(null);
      assert(result == false);
    });

    it('should return false if the given array is not an immutableArray', function(){
      var result = Arrays.isImmutable(data.letters);
      assert(result == false);
    });

    it('should return true if the given array is an immutableArray', function(){
      var lockedArray = data.createAggregatedLockedArray();
      var result = Arrays.isImmutable(lockedArray);
      assert(result);
    });
  });

  describe('#isNotImmutable', function(){
    it('should return true if given undefined', function(){
      var result = Arrays.isNotImmutable();
      assert(result);
    });

    it('should return true if given null', function(){
      var result = Arrays.isNotImmutable(null);
      assert(result);
    });

    it('should return true if given a mutable array', function(){
      var result = Arrays.isNotImmutable(data.letters);
      assert(result);
    });

    it('should return false if given an immutableArray', function(){
      var lockedArray = ImmutableArray.create(data.letters);
      var result = Arrays.isNotImmutable(lockedArray);
      assert(result === false);
    });
  });

  describe('#shuffle', function(){
    it('should not lose anything when shuffling', function(){
      var list = [1, 2, 3, 4, 5];
      Arrays.shuffle(list);
      assert(list.length > 0);
    });
  });
});
