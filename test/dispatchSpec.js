var assert = require('assert');
var should = require('should');
var util = require('util');
var _ = require('underscore');
require('../src/predicates');
require('../src/combine');
require('../src/construct');
require('../src/dispatch');

var servedMessage = ', you have been served';
var name = 'fred';
var numbers = [1,2,3,4,5];
var letters = ['a', 'b', 'c'];
var opNotFound = 'bad mojo';
var performCommand = dispatch(
  isa('notify', function(thing){ return notify(thing.who); }),
  isa('join', function(thing) { return join(thing.one, thing.two); }),
  function(thing) { return opNotFound; }
);

describe('dispatch', function(){
  'use strict';

  it('should be able to be accessed', function(){
    assert(dispatch !== null);
  });

  it('should be able to dispatch "notify" command', function(){
    var command = { type: 'notify', who: name };
    var result = performCommand(command);
    var expected = name + servedMessage;
    (result).should.equal(expected);
  });

  it('should be able to dispatch "join" command', function(){
    var command = { type: 'join', one: numbers, two: letters };
    var result = performCommand(command);
    var expected = numbers.concat(letters);
    assert(_.isEqual(result, expected));
  });

  it('should return opNotFound if the type does not match', function(){
    var command = { type: 'denial' };
    var result = performCommand(command);
    (result).should.equal(opNotFound);
  });
});

var notify = function(who) { return who + servedMessage; };
var join = function(one, two) { return combine(one, two); };
