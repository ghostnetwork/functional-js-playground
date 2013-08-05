'use strict';

var assert = require('assert');
var util = require('util');
require('../src/monad');

describe('monad', function(){
  var identity
    , value
    , monad
    , action;

  beforeEach(function() {
    identity = new MONAD();
    value = 'i am a monad';
    monad = identity(value);
    action = function(argument) { return argument; };
  });

  it('should be able to be created', function(){
    assert(identity !== null);
  });

  it('should be able to perform an action', function(){
    var result = monad.perform(action);
    assert(result === value);
  });

  it('should return true for axiom 1: identity(value).perform(action) === action(value)', function(){
    var expectedResult = action(value);
    var result = identity(value).perform(action);
    assert(result === expectedResult);
  });

  it('should return true for axiom 2: monad.perform(createMonad) === monad', function(){
    // TODO: no apparent way to test this; createMonad is not in scope
  });

  // axiom 3:
  // monad.perform(action).perform(g) ====
  // monad.perform(function (value) { return action(value).perform(g) })
  it('should return true for axiom 3: ', function(){
    // TODO: no apparent way to test this; return from first perform() is not a monad
  });
});
