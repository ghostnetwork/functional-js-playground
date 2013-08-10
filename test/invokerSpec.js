var assert = require('assert');
var should = require('should');
var util = require('util');
var _ = require('underscore');
require('../src/predicates');
require('../src/invoker');

describe('invoker', function(){
  'use strict';

  it('should be able to be accessed', function(){
    assert(invoker !== null);
  });

  it('should be able to create an invoker function', function(){
    var numbers = [1,2,3];
    var array = [numbers];
    var expected = numbers.reverse();
    var reverser = invoker('reverse', Array.prototype.reverse);
    var result = _.map([[1,2,3]], reverser);
    assert(_.isEqual(result.toString(), expected.toString()));
  });
});
