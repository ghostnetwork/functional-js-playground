if (isNotRunningInBrowser()) {  var _ = require('underscore'); }

construct = function(head, tail) {
  return combine([head], _.toArray(tail));
};
