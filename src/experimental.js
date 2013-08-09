'use strict';

// this is just a throwaway little experiment with developing 
// a snippet for creating a universal module.
(function(exports){

  exports.create = function() { 
    this.prototype = Function.prototype;

    var that = {};
    that.bar = function() { return 'i am Experimental.bar'}

    return that;
  };

  // a 'static' method
  exports.fooExperimental = function(){ return 'i am fooExperimental'; };

})(typeof exports === 'undefined'? this['Experimental']={}: exports);
// works in browser and node.js!!!
