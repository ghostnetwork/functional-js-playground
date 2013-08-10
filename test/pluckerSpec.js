var assert = require('assert');
var should = require('should');
var util = require('util');
require('../src/predicates');
require('../src/plucker');

var bookTitle = "Infinite Jest";
var bookAuthor = "David Foster Wallace";

book = {
  title: bookTitle,
  author: bookAuthor
};

describe('#plucker', function(){
  'use strict';

  it('should be able to be accessed', function(){
    assert(plucker !== null);
  });

  it('should return a notExisty result if given field is notExisty', function(){
    // The func function gets created...
    var func = plucker();
    assert(existy(func));

    // ...but the value returned from func() is notExisty
    var result = func(book);
    assert(notExisty(result));
  });

  it('should return the expected data from an object', function(){
    var titlePlucker = plucker('title');
    var result = titlePlucker(book);
    (result).should.equal(bookTitle);
  });

  it('should return the expected data from an array', function(){
    var expected = {title: "Botchan"};
    var books = [{title: "Chthon"}, {stars:5}, expected];
    var thirdFrom = plucker(2);
    var result = thirdFrom(books);
    (result).should.equal(expected);
  });

  it('should throw error if arg to returned function is notExisty', function(){
    var titlePlucker = plucker('title');
    var result = titlePlucker();
    (function(){
      (result).should.equal(bookTitle);
    }).should.throw();
  });
});
