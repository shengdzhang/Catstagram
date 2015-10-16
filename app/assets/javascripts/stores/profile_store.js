(function() {
  'use strict';
  var CHANGE_EVENT = "CHANGE_EVENT";

  var _user = {};
  var _posts = [];

  function resetUser(user) {
    _user = user;
    ProfileStore.changed();
  }

  function resetPosts(posts) {
    _posts = posts;
    ProfileStore.changed();
  }

  window.ProfileStore = $.extend({}, EventEmitter.prototype, {
    user: function () {
      return $.extend({}, _user);
    },
    posts: function () {
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
        case UserConstants.RECEIVED_USER:
          resetUser(action.user);
          break;
        case PostConstants.RECEIVED_ALL_POSTS_FROM_USER:
          resetPosts(action.posts);
          break;
      }
    })
  });
}());
