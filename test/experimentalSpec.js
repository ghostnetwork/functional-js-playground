'use strict';

require('../src/verdoux');

var assert = require('assert');
var util = require('util');
var Experimental = require('../src/experimental');

describe('Experimental', function(){
  var experimental;

  beforeEach(function() {
    experimental = Experimental.create();
  });

  it('should be able to be created', function(){
    assert(existy(experimental));
  });

  describe('#fooExperimental', function(){
    it('should be able to call fooExperimental', function(){
      var result = Experimental.fooExperimental();
      assert(existy(result));
    });
  });

  describe('#bar', function(){
    it('should be able to call bar', function(){
      var result = experimental.bar();
      assert(existy(result));
    });
  });
});