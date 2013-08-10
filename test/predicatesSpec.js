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

  describe('#doWhenTruthy', function(){
    it('should return undefined when given notExisty condition', function(){
      var condition;
      var result = doWhenTruthy(condition, function(){});
      assert(notExisty(result));

      condition = null;
      result = doWhenTruthy(condition, function(){});
      assert(notExisty(result));
    });

    it('should throw error if action is notExisty', function(){
      (function(){
        var condition = true;
        var action;
        var result = doWhenTruthy(condition, action);
      }).should.throw();
    });

    it('should invoke the action if condition is truthy', function(done){
      var condition = true;
      var action = function() { done(); return true; };
      var result = doWhenTruthy(condition, action);
      assert(existy(result));
    });

    it('should not invoke the action if condition is falsey', function(){
      var condition = false;
      var action = function() { 
        fail("shouldn't call action when condition is falsey"); 
        return false;
      };
      var result = doWhenTruthy(condition, action);
      assert(notExisty(result));
    });
  });

  describe('#doWhenFalsey', function(){
    it('should return undefined when given notExisty condition', function(){
      var condition;
      var result = doWhenFalsey(condition, function(){});
      assert(notExisty(result));

      condition = null;
      result = doWhenFalsey(condition, function(){});
      assert(notExisty(result));
    });

    it('should throw error if action is notExisty', function(){
      (function(){
        var condition = false;
        var action;
        var result = doWhenFalsey(condition, action);
      }).should.throw();
    });

    it('should invoke the action if condition is falsey', function(done){
      var condition = false;
      var action = function() { done(); return true; };
      var result = doWhenFalsey(condition, action);
      assert(existy(result));
    });

    it('should not invoke the action if condition is truthy', function(){
      var condition = true;
      var action = function() { 
        fail("shouldn't call action when condition is truthy"); 
        return false;
      };
      var result = doWhenFalsey(condition, action);
      assert(notExisty(result));
    });
  });

  describe('#doWhen', function(){
    it('should not have access to hidden doWhen function', function(){
      (function(){
        doWhen(null, null);
      }).should.throw();
    });
  });

  describe('#isRunningInBrowser', function(){
    it('should return false', function(){
      var result = isRunningInBrowser();
      assert(falsey(result));
    });
  });

  describe('#isNotRunningInBrowser', function(){
    it('should return true', function(){
      var result = isNotRunningInBrowser();
      assert(truthy(result));
    });
  });
});
