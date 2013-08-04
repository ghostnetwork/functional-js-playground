'use strict';

var assert = require('assert');
var util = require('util');

require('./immutableArrayData');
var data = immutableArrayData();

require('../src/predicates');
require('../src/immutableArray');
require('../src/mutableArray');

describe('mutableArray', function(){
  it('should be globally available', function(){
    assert(mutableArray !== null);
  });

  describe('#immutableCopy', function(){
    it('should return an immutableCopy', function(){
      var mutable = mutableArray(data.letters);
      var immutableCopy = mutable.immutableCopy();
      mutable.addElement('fred');
      assert(immutableCopy.length === mutable.length - 1);
    });
  });

  describe('#addElement', function(){
    it('should not fail when given undefined', function(){
      var mutable = mutableArray(data.numbers);
      mutable.addElement();
      assert(mutable.length == data.numbers.length);
    });

    it('should not fail when given null', function(){
      var mutable = mutableArray(data.numbers);
      mutable.addElement(null);
      assert(mutable.length == data.numbers.length);
    });

    it('should be able to add multiple elements', function(){
      var mutable = lettersAndNumbersMutableArray();
      var expected = data.letters.length + data.numbers.length;
      assert(mutable.length == expected);
    });
  });

  describe('#removeElement', function(){
    it('should not fail when given undefined', function(){
      checkRemoveAcceptsUndefinedOrNull();
    });

    it('should not fail when given null', function(){
      checkRemoveAcceptsUndefinedOrNull(null);
    });

    it('should remove the given item', function(){
      var mutable = lettersAndNumbersMutableArray();
      var expected = mutable.length - 1;

      var firstItem = mutable.immutableCopy().first();
      assert(firstItem === data.letters[0]);
      
      mutable.removeElement(firstItem);
      assert(mutable.length == expected);
    });

    function checkRemoveAcceptsUndefinedOrNull(element) {
      var mutable = lettersAndNumbersMutableArray();
      var expected = mutable.length;
      mutable.removeElement(element);
      assert(mutable.length == expected);
    };
  });

  function lettersAndNumbersMutableArray() {
    var mutable = mutableArray(data.letters);
    data.numbers.forEach(function(element) {
      mutable.addElement(element);
    });
    return mutable;
  };
});
