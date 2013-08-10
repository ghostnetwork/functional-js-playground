var assert = require('assert');
var should = require('should');
var util = require('util');
require('../src/predicates');
require('../src/always');

var value = 12345;

describe('always', function(){
  'use strict';

  it('should be able to be accessed', function(){
    assert(always !== null);
  });

  it('should return a function that returns a notExisty value when given a notExisty value', function(){
    var notExistyFunction = always();
    var result = notExistyFunction();
    assert(notExisty(result));
  });

  it('should return a function that is able to return the given value', function(){
    var existyFunction = always(value);
    var result = existyFunction();
    (result).should.equal(value);
  });
});
