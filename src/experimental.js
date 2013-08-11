// this is just a throwaway little experiment with developing 
// a snippet for creating a universal module. also serves as 
// a means of experimenting with ensuring code can run 
// universally.
if (isNotRunningInBrowser()) { var _ = require('underscore'); }

(function(exports){
  'use strict';

  exports.create = function() { 
    this.prototype = Function.prototype;

    var that = {};

    that.bar = function() { return 'i am Experimental.bar'; };
    that.canAccessUnderscore = function() { return existy(_); };

    return that;
  };

  // a 'static' method
  exports.fooExperimental = function(){ return 'i am fooExperimental'; };

})(typeof exports === 'undefined'? this.Experimental={}: exports);
// works in browser and node.js!!!
