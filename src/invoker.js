if (isNotRunningInBrowser()) {  var _ = require('underscore'); }

invoker = function(name, method) {
  return function(target /* args ... */) {
    if (notExisty(target)) fail('Must provide a target');

    var targetMethod = target[name];
    var args = _.rest(arguments);

    function check() { return existy(targetMethod) && method === targetMethod; }

    return doWhenTruthy(check, function() {
      return targetMethod.apply(target, args);
    });
  };
};
