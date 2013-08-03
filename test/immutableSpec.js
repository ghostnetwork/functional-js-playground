'use strict';

var assert = require('assert');
var should = require('should');
var util = require('util');
require('../src/predicates');
require('../src/immutable');

describe('immutable', function(){
  var array = ['a', 'b', 'c'];
  var numbers = [1, 2, 3, 4, 5];
  var letters = ['z', 'y', 'x'];

  describe('#immutableArray', function(){
    it('should ensure each instance of an immutableArray is unique', function(){
      var hydrogen = immutableArray(numbers);
      var oxygen = immutableArray(letters);
      assert(hydrogen.first() !== oxygen.first());
    });

    describe('#constructor', function(){
      it('should be empty when created without a provided array', function(){
        var lockedArray = immutableArray();
        assert(lockedArray != null);
        checkArrayIsEmpty(lockedArray);
      });

      it('should have an immutable copy of the array it was created with', function(){
        var lockedArray = immutableArray(array);
        var length = lockedArray.length;
        assert(length === array.length);
      });

      it('should return an empty array when given null', function(){
        var testArray = null;
        var lockedArray = immutableArray(testArray);
        checkArrayIsEmpty(lockedArray);
      });

      it('should return an empty array when given undefined', function(){
        var testArray;
        var lockedArray = immutableArray(testArray);
        checkArrayIsEmpty(lockedArray);
      });
    });
    
    describe('#length', function(){
      it('should return 0 when created without a provided array', function(){
        var lockedArray = immutableArray();
        var length = lockedArray.length;
        assert(length === 0);
      });

      it('should return the number of items in the provided array', function(){
        var lockedArray = immutableArray(array);
        var length = lockedArray.length;
        assert(length === array.length);
      });
    });

    describe('#itemAtIndex', function(){
      it('should return undefined when given an index less than 0', function(){
        var lockedArray = immutableArray(array);
        var item = lockedArray.itemAtIndex(-1);
        assert(item === undefined);
      });

      it('should return undefined when given an index that is past the end of the array', function(){
        var lockedArray = immutableArray(array);
        var item = lockedArray.itemAtIndex(array.length);
        assert(item === undefined);
      });

      it('should return the first item in the array when given 0', function(){
        var lockedArray = immutableArray(array);
        checkItemAtIndexEqualsItemInArrayAtIndex(lockedArray, 0);
      });

      it('should return the correct item when given a valid index', function(){
        var lockedArray = immutableArray(array);
        checkItemAtIndexEqualsItemInArrayAtIndex(lockedArray, 1);
      });

      it('should return the last item in the array when given the last index', function(){
        var lockedArray = immutableArray(array);
        var index = array.length - 1;
        checkItemAtIndexEqualsItemInArrayAtIndex(lockedArray, index);
      });
    });

    describe('#isEmpty', function(){
      it('should return true if the array is empty', function(){
        var lockedArray = immutableArray();
        var result = lockedArray.isEmpty();
        assert(result);
      });

      it('should return false if the array is not empty', function(){
        var lockedArray = immutableArray(array);
        var result = lockedArray.isEmpty();
        assert(result == false);
      });
    });

    describe('#isNotEmpty', function(){
      it('should return false if the array is empty', function(){
        var lockedArray = immutableArray();
        var result = lockedArray.isNotEmpty();
        assert(result == false);
      });

      it('should return false if the array is not empty', function(){
        var lockedArray = immutableArray(array);
        var result = lockedArray.isNotEmpty();
        assert(result);
      });
    });

    describe('#forEach', function(){
      it('should throw an error when given a null action', function(){
        (function(){
          var action = null;
          var lockedArray = immutableArray(array);
          lockedArray.forEach(action);
        }).should.throw();
      });

      it('should throw an error when given an undefined action', function(){
        (function(){
          var action;
          var lockedArray = immutableArray(array);
          lockedArray.forEach(action);
        }).should.throw();
      });

      it('should perform the action given to it', function(done){
        var lockedArray = immutableArray(array);
        var counter = 0;
        var action = function() { if (counter++ >= array.length - 1) done(); };
        lockedArray.forEach(action);
        // Test will timeout if action isn't called the expected number of times
      });

      it('should not allow me to alter the original array', function(){
        var lockedArray = immutableArray(array);
        var expectedLength = array.length;

        var action = function(element, index, theArray) {
          assert(theArray === undefined);
        };

        lockedArray.forEach(action);
        
        var length = lockedArray.length;
        assert(length === expectedLength);
      });
    });

    describe('#every', function(){
      it('should throw an error if action is null', function(){
      });

      it('should return false if the test does not return true for all items', function(){
        var myArray = [12, 5, 8, 130, 44];
        var lockedArray = immutableArray(myArray);
        var result = lockedArray.every(isBigEnough);
        assert(result === false);
      });

      it('should return true if the test returns true for all items', function(){
        var myArray = [12, 54, 18, 130, 44];
        var lockedArray = immutableArray(myArray);
        var result = lockedArray.every(isBigEnough);
        assert(result);
      });
    });

    describe('#some', function(){
      it('should return false if the test did not pass for any of the items', function(){
        var myArray = [2, 5, 8, 1, 4];
        var lockedArray = immutableArray(myArray);
        var result = lockedArray.some(isBigEnough);
        assert(result === false);
      });

      it('should return true if the test passed for any of the items', function(){
        var myArray = [12, 5, 8, 1, 4];
        var lockedArray = immutableArray(myArray);
        var result = lockedArray.some(isBigEnough);
        assert(result);
      });
    });

    describe('#contains', function(){
      var target;

      beforeEach(function(){
        target = 'b';
      });

      it('should return false if the array is empty', function(){
        var emptyArray = immutableArray();
        var result = emptyArray.contains(target);
        assert(result == false);
      });

      it('should return false if the given target is null', function(){
        target = null;
        checkDoesNotContain(target);
      });

      it('should return false if the given target is undefined', function(){
        target = undefined;
        checkDoesNotContain(target);
      });

      it('should return true if the array does contain the given target', function(){
        var lockedArray = immutableArray(array);
        var result = lockedArray.contains(target);
        assert(result);
      });

      it('should return false if the array does not contain the given target', function(){
        var lockedArray = immutableArray(array);
        target = 'z';
        var result = lockedArray.contains(target);
        assert(result == false);
      });
    });

    describe('#first', function(){
      it('should return undefined if the array is empty', function(){
        var lockedArray = immutableArray();
        var first = lockedArray.first();
        assert(first == undefined);
      });

      it('should return the first item in the array', function(){
        var lockedArray = immutableArray(array);
        var first = lockedArray.first();
        var expectedItem = array[0];
        assert(first === expectedItem);
      });
    });

    describe('#last', function(){
      it('should return undefined if the array is empty', function(){
        var lockedArray = immutableArray();
        var last = lockedArray.last();
        assert(last == undefined);
      });
    
      it('should return the last item in the array', function(){
        var lockedArray = immutableArray(array);
        var last = lockedArray.last();
        var expectedItem = array[array.length - 1];
        assert(last === expectedItem);
      });
    });

    describe('#mutableCopy', function(){
      it('should return undefined if the array is empty', function(){
        var lockedArray = immutableArray();
        var mutableCopy = lockedArray.mutableCopy();
        assert(mutableCopy == undefined);
      });

      it('should return a mutable copy of the immutable array', function(){
        var lockedArray = immutableArray(array);
        var mutableCopy = lockedArray.mutableCopy();
        mutableCopy.push('aaa');
        assert(mutableCopy.length > array.length);
      });

      it('should not change the original array', function(){
        var lockedArray = immutableArray(array);
        var mutableCopy = lockedArray.mutableCopy();
        mutableCopy.push('bbb');
        assert(lockedArray.length == array.length);
      });
    });

    describe('#createFilledWith', function(){
      it('should create a new immutableArray that has the requested number of items', function(){
        var thing = '.';
        var times = 10;
        var lockedArray = immutableArray.createFilledWith(times, thing);
        assert(lockedArray != null);
        assert(lockedArray.length == times);
      });

      it('should create a new immutableArray that is only filled with the given item', function(){
        var thing = '-';
        var times = 10;
        var lockedArray = immutableArray.createFilledWith(thing, times);
        var result = lockedArray.every(function(element) { return element === thing; });
        assert(result);
      });
    });

    describe('#createUsingEveryOtherFrom', function(){
      it('should create a new immutableArray that is filled with every other item from the source array', function(){
        var lockedArray = createAggregatedLockedArray();
        var result = immutableArray.createUsingEveryOtherFrom(lockedArray);
        var expectedNumItems = Math.round(lockedArray.length / 2);
        assert(result.length == expectedNumItems);
      });
    });

    describe('#makeEveryOther', function(){
      it('should create a function that allows me to skip every third item', function(){
        var lockedArray = createAggregatedLockedArray();
        var n = 3;
        var everyThird = immutableArray.makeEveryOther(n, lockedArray);
        var result = everyThird();
        var expectedNumItems = Math.round(lockedArray.length / 3);
        assert(result.length == expectedNumItems);
      });
    });
  });

  function checkArrayIsEmpty(lockedArray) {
    var length = lockedArray.length;
    assert(length === 0);
  };

  function checkItemAtIndexEqualsItemInArrayAtIndex(lockedArray, index) {
    var item = lockedArray.itemAtIndex(index);
    var expectedItem = array[index];
    expectedItem.should.equal(item);
  };

  function isBigEnough(element, index, array) {
    assert(array === undefined);
    return (element >= 10);
  };

  function checkDoesNotContain(target) {
    var lockedArray = immutableArray(array);
    var result = lockedArray.contains(target);
    assert(result == false);
  };

  function createAggregatedLockedArray() {
    var sourceArray = array.concat(numbers).concat(letters);
    return immutableArray(sourceArray);
  }
});