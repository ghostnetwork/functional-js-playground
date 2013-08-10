if (isNotRunningInBrowser()) {  var _ = require('underscore'); }

combine = function() {
  var head = _.first(arguments);
  var result = [];
  if (existy(head))
    result = head.concat.apply(head, _.rest(arguments));
  return result;
};
