if (isNotRunningInBrowser()) { var _ = require('underscore'); }

dispatch = function() {
  var funcs = _.toArray(arguments);
  var size = funcs.length;

  return function(target /* args */) {
    var result;
    var args = _.rest(arguments);

    for (var funIndex = 0; funIndex < size; funIndex++) {
      var func = funcs[funIndex];
      result = func.apply(func, construct(target, args));

      if (existy(result)) return result;
    }

    return result;
  };
};
