'use strict';

var assert = require('assert');
var should = require('should');
var util = require('util');
require('../src/predicates');
require('../src/immutable');

describe('immutable', function(){
  var array = ['a', 'b', 'c'];

  beforeEach(function() {
  });

  describe('#immutable', function(){
    it('should return the value that was originally given to it', function(){
      var value = 'foo';
      var immutableFoo = immutable(value);
      var immutableValue = immutableFoo.value();
      value.should.equal(immutableValue);
    });
  });

  describe('#immutableArray', function(){
    describe('#constructor', function(){
      it('should be empty when created without a provided array', function(){
        var lockedArray = immutableArray();
        assert(lockedArray != null);
        checkArrayIsEmpty(lockedArray);
      });

      it('should have an immutable copy of the array it was created with', function(){
        var lockedArray = immutableArray(array);
        var count = lockedArray.count();
        assert(count === array.length);
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
    
    describe('#count', function(){
      it('should return 0 when created without a provided array', function(){
        var lockedArray = immutableArray();
        var count = lockedArray.count();
        assert(count === 0);
      });

      it('should return the number of items in the provided array', function(){
        var lockedArray = immutableArray(array);
        var count = lockedArray.count();
        assert(count === array.length);
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
        var expectedCount = array.length;

        var action = function(element, index, theArray) {
          assert(theArray === undefined);
        };

        lockedArray.forEach(action);
        
        var count = lockedArray.count();
        assert(count === expectedCount);
      });
    });
  });

  function checkArrayIsEmpty(lockedArray) {
    var count = lockedArray.count();
    assert(count === 0);
  };

  function checkItemAtIndexEqualsItemInArrayAtIndex(lockedArray, index) {
    var item = lockedArray.itemAtIndex(index);
    var expectedItem = array[index];
    expectedItem.should.equal(item);
  };
});