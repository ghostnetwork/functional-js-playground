'use strict';

var assert = require('assert');
var util = require('util');
var _ = require('underscore');
require('../src/predicates');
require('../src/combine');

require('./immutableArrayData');
var data = immutableArrayData();

var name = 'zed';
var verb = 'is dead';

describe('combine', function(){
  describe('#combine', function(){
    it('should be able to be accessed', function(){
      assert(existy(combine));
    });

    it('should be able to combine the contents of two arrays', function(){
      var result = combine(data.array, data.letters, data.numbers);
      var expected = data.array.concat(data.letters.concat(data.numbers));
      assert(_.isArray(result));
      assert(_.isEqual(result, expected));
    });

    it('should be able to combine two strings', function(){
      var result = combine(name, ' ', verb);
      var expected = name + ' ' + verb;
      assert(_.isString(result));
      assert(_.isEqual(result, expected));
    });

    it('should be able to combine a string with an array', function(){
      var result = combine(name, data.numbers);
      var expected = name + data.numbers.toString();
      assert(_.isString(result));
      assert(_.isEqual(result, expected));
    });
  });  
});