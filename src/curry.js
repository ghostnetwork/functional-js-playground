
curry = function(action) { return function(arg) { return action(arg); }; };

curry2 = function(action) {
  return function(secondArg) {
    return function(firstArg) {
      return action(firstArg, secondArg);
    };
  };
};
