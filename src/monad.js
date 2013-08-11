var util = require('util');

MONAD = function() {
  var prototype = Object.create(null);
  prototype.is_monad = true;

  function createMonad(value) {
    var monad = Object.create(prototype);

    monad.perform = function(func, args) {
      return func.apply(undefined, [value].concat(Array.prototype.slice.apply(args || [])));
    };

    return monad;
  }

  createMonad.lift = function (name, func) {
    prototype[name] = function () {
        var result = this.perform(func, arguments);
        return result && result.is_monad === true ? result : createMonad(result);
    };
    return createMonad;
  };

  createMonad.lift_value = function (name, func) {
    prototype[name] = function () {
        return this.perform(func, arguments);
    };
    return createMonad;
  };

  createMonad.method = function(name, func) {
    prototype[name] = func;
    return createMonad;
  };

  return createMonad;
};

maybe = MONAD(function (monad, value){
  if (value === null || value === undefined) {
    monad.is_null = true;
    monad.perform = function() { return monad; };
  }
});
