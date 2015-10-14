(function(root) {
  'use strict';
  var CHANGE_EVENT = "CHANGE_EVENT";

  var _posts = [];

  function resetPosts(posts) {
    _posts = posts;
    PostStore.changed();
  }

  root.PostStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _posts.slice();
    },
    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },
    changed: function () {
      this.emit(CHANGE_EVENT);
    },
    dispatcherId: AppDispatcher.register(function (action) {
      switch (action.actionType) {
        case PostConstants.RECEIVED_ALL_POSTS_FROM_USER:
          resetPosts(action.posts);
          break;
      }
    })
  });
}(this));
