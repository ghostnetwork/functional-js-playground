#!/usr/bin/env node

'use strict';

var util = require('util');
var _ = require('underscore');
var StringTheory = require('./stringTheory');

var lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing e1lit, sed do eiusmod \
      tempor incididunt ut lab3ore et dolore magna aliqua. Ut enim ad minim veniam, \
      quis nostr2ud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
      cillum dolore eu fugi4at nulla pariatur. Excepteur sint occaecat cupidatat non \
      proident, sunt in culpa qui officia deserunt mollit anim id est labo5rum.';

var app = StringTheory.create();
var words = app.parseIntoWords(lorem);
var result = app.letterCountSorted(words);
console.log('result: ' + util.inspect(result));
