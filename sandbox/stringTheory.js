
(function(exports){
  'use strict';

  exports.create = function() { 
    this.prototype = Function.prototype;

    var that = {};

    // Public API
    that.parseIntoWords = parseIntoWords;
    that.parseIntoLetters = parseIntoLetters;
    that.filterEmpty = filterEmpty;
    that.letterCountSorted = letterCountSorted;

    that.isEmpty = isEmpty;
    that.isNotEmpty = isNotEmpty;
    that.isAlphanumeric = isAlphanumeric;

    return that;
  };

  // 'static' functions
  exports.test = function(){ return undefined; };

  // local implementations
  function parseIntoWords(input) {  return _.filter(input.split(' '), isNotEmpty); }
  function parseIntoLetters(input) { return input.split(''); }
  function filterEmpty(words) { return _.filter(words, isAlphanumeric); }

  function isEmpty(element) { return _.isEmpty(element); }
  function isNotEmpty(element) { return not(isEmpty(element)); }
  function isAlphanumeric(character) { return character.match(/^[0-9a-zA-Z]+$/); };

  function letterCountSorted (words) {
    var letters = [];

    words.forEach(function(element) {
      var characters = parseIntoLetters(element);
      characters.forEach(function(character) { letters.push(character); });
      return letters;
    });

    letters = filterEmpty(letters);

    var count = _.countBy(letters, _.identity);
    var countFlipped = flipArray(count);
    var sorted = _.sortBy(count, function(value, key) { return count[key]; }).reverse();

    var result = [];
    sorted.forEach(function(key, index, array) { 
      var otherKey = count[key];
      var value = countFlipped[key];
      var item = {letter:value, count:array[index]};
      result.push(item); 
    });

    return result;
  }

  function flipArray(array){
    var key, tmp_ar = {};
    for (key in array){
      if (array.hasOwnProperty(key)){
          tmp_ar[array[key]] = key;
      }
    }
    return tmp_ar;
  }

  // imports
  var _ = require('underscore');
  require('../src/predicates');

  // universal plumbing
})(typeof exports === 'undefined'? this.StringTheory={}: exports);
