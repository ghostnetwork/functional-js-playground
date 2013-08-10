var assert = require('assert');
var should = require('should');
var util = require('util');
var _ = require('underscore');
require('../src/curry');

var div = function(n, d) { return n / d; };

describe('curry', function(){
  'use strict';

  it('should be able to be accessed', function(){
    assert(curry !== null);
  });

  describe('#curry', function(){
    it('should be able to curry functions', function(){
      var array = ['11', '11', '11', '11', '11'];
      var func = curry(parseInt);
      var result = array.map(func);
      var expected = [11, 11, 11, 11, 11];
      assert(_.isEqual(result, expected));
    });
  });

  describe('#curry2', function(){
    it('should be able to curry a function with two args', function(){
      var x = 10;
      var divByX = curry2(div)(x);
      var value = 50;
      var result = divByX(value);
      var expected = value / x;
      (result).should.equal(expected);
    });
  });
});
