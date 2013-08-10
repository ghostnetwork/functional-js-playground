var assert = require('assert');
var should = require('should');
var util = require('util');
var _ = require('underscore');
require('../src/predicates');
require('../src/construct');
require('../src/combine');

describe('construct', function(){
  'use strict';

  it('should be able to be accessed', function(){
    assert(construct !== null);
  });

  describe('#construct', function(){
    it('should construct a new array that combines the given pieces', function(){
      var number = 42;
      var array = [1,2,3];

      var expected = [number];
      array.forEach(function(element) { expected.push(element); });
      
      var result = construct(number, array);
      assert(existy(result));

      assert(_.isEqual(result, expected));
    });
  });
});
