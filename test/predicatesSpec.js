'use strict';

var _ = require('underscore');
var assert = require('assert');
var should = require('should');
var util = require('util');
require('../src/predicates');

describe('predicates', function(){
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

  describe('#not', function(){
    it('should return true when given notExisty', function(){
      var result = not();
      assert(result);
    });

    it('should return true when given falsey', function(){
      var result = not(false);
      assert(result);
    });

    it('should return false when given truthy', function(){
      var result = not(true);
      assert(falsey(result));
    });
  });

  describe('#makeOppositeOf', function(){
    it('should throw error when executing result when given predicate is notExisty', function(){
      var predicate;
      var result = makeOppositeOf(predicate);
      assert(existy(result));

      (function(){
        var value = result();
      }).should.throw();
    });

    it('should create a function that returns the opposite of the given one', function(){
      var predicate = isEven;
      var evenValue = 4;
      var oddValue = 3;

      var result = isEven(evenValue);
      assert(truthy(result));

      var myIsOdd = makeOppositeOf(isEven);
      result = myIsOdd(evenValue);
      assert(falsey(result));

      result = myIsOdd(oddValue);
      assert(truthy(result));
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

  describe('#isEven', function(){
    it('should return false if given value is notExisty', function(){
      var value;
      var result = isEven(value);
      assert(falsey(result));
    });

    it('should return false if given value is odd', function(){
      var value = 3;
      var result = isEven(value);
      assert(falsey(result));
    });

    it('should return true if given value is even', function(){
      var value = 4;
      var result = isEven(value);
      assert(truthy(value));
    });

    it('should return false if given value is not a number', function(){
      var value = 'abcdefghijklmn';
      var result = isEven(value);
      assert(falsey(result));

      value = [1, 2, 3, 4, 5];
      result = isEven(value);
      assert(falsey(result));
    });
  });

  describe('#isOdd', function(){
    it('should return false if given value is notExisty', function(){
      var value;
      var result = isOdd(value);
      assert(truthy(result));
    });

    it('should return false if given value is odd', function(){
      var value = 3;
      var result = isOdd(value);
      assert(truthy(result));
    });

    it('should return true if given value is even', function(){
      var value = 4;
      var result = isOdd(value);
      assert(truthy(value));
    });

    it('should return false if given value is not a number', function(){
      var value = 'abcdefghijklmn';
      var result = isOdd(value);
      assert(truthy(result));

      value = [1, 2, 3, 4, 5];
      result = isOdd(value);
      assert(truthy(result));
    });
  });

  describe('#isa', function(){
    it('should throw if type is notExisty', function(){
      var type;
      var action = function(){};
      var result = isa(type, action);
      (function(){
        result(type);
      }).should.throw();
    });

    it('should return a notExisty value if thing has no type field', function(){
      var type = {};
      var action = function(){};
      var result = isa(type, action);
      var value = result(type);
      assert(notExisty(value));
    });

    it('should return the expected value', function(done){
      var expected = 'zed';
      var action = function() { done(); return expected; };
      var func = isa(expected, action);
      var thing = { type: expected };
      var result = func(thing);
      (result).should.equal(expected);
    });

    it('should return notExisty if given an unexpected value', function(){
      var expected = 'halogen';
      var action = function() { done(); return expected; };
      var func = isa(expected, action);
      var thing = { type: 'oxygen' };
      var result = func(thing);
      assert(notExisty(result));
    });
  });

  describe('#functionFromJSON', function(){
    it('should throw error if json is notExisty', function(){
      (function(){
        var json;
        var result = functionFromJSON(json);
      }).should.throw();
    });

    it('should be able to recreate a Function from JSON', function(){
      var task = function(a){return a;};
      var taskJSON = task.toString();
      var worker = functionFromJSON(taskJSON);
      assert(existy(worker));
      assert(_.isFunction(worker));

      var fixture = 'carbon';
      var result = worker(fixture);
      assert(existy(result));
      (result).should.equal(fixture);
    });
  });
});
