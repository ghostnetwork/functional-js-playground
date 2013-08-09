'use strict';

var assert = require('assert');
var Tools = require('../src/tools');
require('../src/predicates');

describe('Tools', function(){
  describe('#inspect', function(){
    it('should be able to inspect something that is notExisty', function(){
      var thing;
      var result = Tools.inspect(thing);
      assert(existy(result));
    });
  });
});
