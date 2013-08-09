
existy = function (x) { return x != null };
notExisty = function (x) { return existy(x) === false };
truthy = function (x) { return (x !== false) && existy(x) };
falsey = function (x) { return truthy(x) === false };
fail = function(thing) { throw new Error(thing) };

isRunningInBrowser = (typeof exports === 'undefined');
isNotRunningInBrowser = isRunningInBrowser === false;
