'use strict';

var assert = require('assert');
require('../src/immutableArray');
require('../src/immutableArrayExtras');

require('./immutableArrayData');
var data = immutableArrayData();

describe('immutableArrayExtras', function(){

  it('should be able to be created', function(){
    assert(immutableArray !== null);
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
      var lockedArray = data.createAggregatedLockedArray();
      var result = immutableArray.createUsingEveryOtherFrom(lockedArray);
      var expectedNumItems = Math.round(lockedArray.length / 2);
      assert(result.length == expectedNumItems);
    });
  });

  describe('#makeEveryOther', function(){
    it('should create a function that allows me to skip every third item', function(){
      var lockedArray = data.createAggregatedLockedArray();
      var n = 3;
      var everyThird = immutableArray.makeEveryOther(n, lockedArray);
      var result = everyThird();
      var expectedNumItems = Math.round(lockedArray.length / 3);
      assert(result.length == expectedNumItems);
    });
  });

});