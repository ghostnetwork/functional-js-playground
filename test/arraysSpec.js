'use strict';

var assert = require('assert');
require('../src/arrays');

require('./immutableArrayData');
var data = immutableArrayData();

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
  });
});
