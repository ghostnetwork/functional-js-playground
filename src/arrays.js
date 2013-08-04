
var _Arrays = function() { this.prototype = Function.prototype; };
Arrays = new _Arrays();

Arrays.firstItem = function(array) { return function() { return array[0]; }; };
Arrays.lastItem = function(array) { return function() { return array[array.length - 1]; }; };

// Arrays.rangeOfItems = function(array, range) {
// }