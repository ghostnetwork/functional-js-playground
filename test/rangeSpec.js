'use strict';

var assert = require('assert');
var util = require('util');
require('../src/predicates');
require('../src/range');

describe('range', function(){
  var sourceRange
    , sameRange
    , lowerBoundDiffRange
    , upperBoundDiffRange;

  beforeEach(function(){
    sourceRange = Range(0, 10);
    sameRange = Range(0, 10);
    lowerBoundDiffRange = Range(5, 10);
    upperBoundDiffRange = Range(0, 5);
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

    function createMutableCopy() {
      var mutable = sourceRange.createMutableCopy();
      mutable.start = 5;
      return mutable;
    }
  });

  function checkRangesAreEqual(firstRange, otherRange) {
    assert(otherRange.start === firstRange.start);
    assert(otherRange.end === firstRange.end);
  };
});