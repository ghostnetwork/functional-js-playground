'use strict';

var _ = require('underscore');
var assert = require('assert');
var should = require('should');
var util = require('util');
require('../src/predicates');

describe('predicates', function(){
  describe('#existy', function(){
    it('should return false when given null', function(){
      var thing = null;
      assert(existy(thing) === false);
    });

    it('should return false when given undefined', function(){
      var thing;
      assert(existy(thing) === false);
    });

    it('should return true when given false', function(){
      var thing = false;
      assert(existy(thing));
    });

    it('should return true when given true', function(){
      var thing = true;
      assert(existy(thing));
    });

    it('should return true when given a non-boolean', function(){
      var thing = 'red';
      assert(existy(thing));
    });
  });
  
  describe('#notExisty', function(){
    it('should return false if thing exists', function(){
      var value = 123;
      var result = notExisty(value);
      assert(result === false);
    });

    it('should return true if thing does not exist', function(){
      var value;
      var result = notExisty(value);
      assert(result);
    });
  });
  
  describe('#truthy', function(){
    it('should return false when given null', function(){
      assert(truthy(null) === false);
    });

    it('should return false when given undefined', function(){
      var thing;
      assert(truthy(thing) === false);
    });

    it('should return false when given false', function(){
      var thing = false;
      assert(truthy(thing) === false);
    });

    it('should return true when given true', function(){
      var thing = true;
      assert(truthy(thing));
    });

    it('should return true when given a non-boolean', function(){
      var thing = 'blue';
      assert(truthy(thing));
    });
  });

  describe('#falsey', function(){
    it('should return true when given null', function(){ 
      var thing = null;
      assert(falsey(thing));
    });

    it('should return true when given undefined', function(){
      var thing;
      assert(falsey(thing));
    });

    it('should return true when given false', function(){
      var thing = false;
      assert(falsey(thing));
    });

    it('should return false when given true', function(){
      var thing = true;
      assert(falsey(thing) == false);
    });

    it('should return false when given non-boolean', function(){
      var thing = 'green';
      assert(falsey(thing) == false);
    });
  });

  describe('#fail', function(){
    it('should throw an error', function(){
      (function(){
        fail('i am hungry');
      }).should.throw();
    });
  });
});
