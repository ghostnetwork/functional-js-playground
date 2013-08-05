var util = require('util');

MONAD = function() {
  return function createMonad(value) {
    var monad = Object.create(null);
    monad.perform = function(func) {
      return func(value);
    };
    return monad;
  }
}

