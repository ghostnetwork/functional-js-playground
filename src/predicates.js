
existy = function (x) { return x != null };
notExisty = function (x) { return existy(x) === false };
truthy = function (x) { return (x !== false) && existy(x) };
falsey = function (x) { return truthy(x) === false };
fail = function(thing) { throw new Error(thing) };

doWhenTruthy = function(condition, action) {
  return doWhen(truthy, condition, action);
};

doWhenFalsey = function(condition, action) {
  return doWhen(falsey, condition, action);
};

var doWhen = function(predicate, condition, action) {
  var result = undefined;
  if (predicate(condition))
    result = action();
  return result;
};

isRunningInBrowser = (typeof exports === 'undefined');
isNotRunningInBrowser = isRunningInBrowser === false;
