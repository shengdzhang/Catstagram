(function(root) {
  'use strict';
  var _posts = [];

  root.PostStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _posts.slice();
    }
  });
}(this));
