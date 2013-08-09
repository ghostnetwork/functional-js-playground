'use strict';

var assert = require('assert');
var os = require('os');
var should = require('should');
var util = require('util');
require('../src/predicates');
require('../src/range');

require('./immutableArrayData');
var data = immutableArrayData();

describe('range', function(){
  var sourceRange
    , sameRange
    , lowerBoundDiffRange
    , upperBoundDiffRange
    , emptyRange;

  beforeEach(function(){
    sourceRange = Range(0, 10);
    sameRange = Range(0, 10);
    lowerBoundDiffRange = Range(5, 10);
    upperBoundDiffRange = Range(0, 5);
    emptyRange = EmptyRange();
  });

  it('should be able to be accessed', function(){
    assert(Range !== null);
  });

  describe('#constructor', function(){
    it('should return an object that encapsulates the given start and end values', function(){
      var start = 0;
      var end = 10;
      var range = Range(start, end);
      assert(range.start === start);
      assert(range.end === end);
    });

    it('should have the isMutable flag set to false', function(){
      var donor = sourceRange;
      var clone = Range.clone(sourceRange);
      assert(clone.isMutable == false);
    });
  });

  describe('#length', function(){
    it('should return 0 if the range is empty', function(){
      assert(emptyRange.length == 0);
    });

    it('should return a positive number if the range is non-empty and end is greater than start', function(){
      var start = 5, end = 10;
      var expected = end - start;
      
      var range = Range(start, end);
      assert(range.length == expected);
    });
  });

  describe('#clone', function(){
    it('should return undefined when range to clone is undefined', function(){
      var clone = Range.clone();
      assert(clone === undefined);
    });

    it('should return undefined when range to clone is null', function(){
      var clone = Range.clone(null);
      assert(clone === undefined);
    });

    it('should create a clone that contains the same values as the donor', function(){
      var donor = sourceRange;
      var clone = Range.clone(sourceRange);
      checkRangesAreEqual(donor, clone);
    });

    it('should have the isMutable flag set to false', function(){
      var donor = sourceRange;
      var clone = Range.clone(sourceRange);
      assert(clone.isMutable == false);
    });
  });

  describe('#equals', function(){
    it('should return false if otherRange is undefined', function(){
      var result = sourceRange.equals();
      assert(result == false);
    });

    it('should return false if otherRange is null', function(){
      var result = sourceRange.equals(null);
      assert(result == false);
    });

    it('should return true if other Range has the same values', function(){
      var result = sourceRange.equals(sourceRange);
      assert(result);
    });
  });

  describe('#createMutableCopy', function(){
    it('should create a mutable copy whose values can be adjusted separately from the donor', function(){
      var mutable = createMutableCopy();
      assert(sourceRange.start != mutable.start);
    });

    it('should have the isMutable flag set to true', function(){
      var mutable = createMutableCopy();
      assert(mutable.isMutable);
    });

    it('should have a different length', function(){
      var mutable = createMutableCopy();
      var origLength = sourceRange.length;
      var newLength = mutable.length;
      assert(origLength != newLength);
    });

    function createMutableCopy() {
      var mutable = sourceRange.createMutableCopy();
      mutable.start = 5;
      return mutable;
    }
  });

  describe('#isWithin', function(){
    it('should return false if Range is empty', function(){
      var result = emptyRange.isWithin(5);
      assert(result == false);
    });

    it('should return false if index is before start', function(){
      var result = lowerBoundDiffRange.isWithin(0);
      assert(result == false);

      result = lowerBoundDiffRange.isWithin(4);
      assert(result == false);
    });

    it('should return false if index is after end', function(){
      var result = upperBoundDiffRange.isWithin(10);
      assert(result == false);

      result = upperBoundDiffRange.isWithin(6);
      assert(result == false);
    });

    it('should return true if index is within range', function(){
      var result = lowerBoundDiffRange.isWithin(5);
      assert(result);
      
      result = upperBoundDiffRange.isWithin(4);
      assert(result);
    });
  });

  describe('#isValidFor', function(){
    it('should throw error if array is notExisty', function(){
      (function(){
        var array;
        var result = sourceRange.isValidFor(array);
        assert(result == undefined);
      }).should.throw();
    });

    it('should return false if range is not valid (start too low) for the given array', function(){
      var range = Range(-1, 3);
      var result = range.isValidFor(data.numbers);
      assert(result == false);
    });

    it('should return false if range is not valid (start too high) for the given array', function(){
      var startTooHigh = lowerBoundDiffRange;
      var result = startTooHigh.isValidFor(data.letters);
      assert(result == false);
    });

    it('should return false if range is not valid (end too low) for the given array', function(){
      var endTooLow = Range(0, -1);
      var result = endTooLow.isValidFor(data.numbers);
      assert(result == false);
    });

    it('should return false if range is not valid (end too high) for the given array', function(){
      var endTooHigh = Range(0, 100);
      var result = endTooHigh.isValidFor(data.numbers);
      assert(result == false);
    });

    it('should return true if range is valid for the given array', function(){
      var range = Range(0, 4);
      var result = range.isValidFor(data.numbers);
      assert(result);

      range = Range(1, 3);
      result = range.isValidFor(data.numbers);
      assert(result);
    });
  });
  
  function checkRangesAreEqual(firstRange, otherRange) {
    assert(otherRange.start === firstRange.start);
    assert(otherRange.end === firstRange.end);
  };
});