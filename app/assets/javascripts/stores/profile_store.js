(function() {
  'use strict';
  var CHANGE_EVENT = "CHANGE_EVENT";

  var _user = {};
  var _posts = [];
  var _following = false;

  function resetUser(user) {
    _user = user;
    _following = user.following;
    ProfileStore.changed();
  }

  function resetPosts(posts) {
    _posts = posts;
    ProfileStore.changed();
  }

  function updateFollowStatus(status) {
    _following = status;
    ProfileStore.changed();
  }

  window.ProfileStore = $.extend({}, EventEmitter.prototype, {
    user: function () {
      return $.extend({}, _user);
    },
    posts: function () {
      return _posts.slice();
    },
    following: function () {
      return _following;
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
        case UserConstants.RECEIVED_FOLLOW_TOGGLE_REQUEST:
          updateFollowStatus(action.status.following);
          break;
      }
    })
  });
}());
