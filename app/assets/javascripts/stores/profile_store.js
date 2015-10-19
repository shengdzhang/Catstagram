(function() {
  'use strict';
  var CHANGE_EVENT = "CHANGE_EVENT";

  var _user = {};
  var _following = false;

  function resetUser(user) {
    _user = user;
    _following = user.following;
    ProfileStore.changed();
  }

  function updateFollowStatus(status) {
    _following = status;
    if (status) {
      _user.followers.unshift({ id: window.CURRENT_USER_ID, username: window.CURRENT_USER_USERNAME });
    } else {
      _user.followers.forEach(function (follower, index) {
        if (follower.id === window.CURRENT_USER_ID) {
          _user.followers.splice(index, 1);
        }
      });
    }
    ProfileStore.changed();
  }

  window.ProfileStore = $.extend({}, EventEmitter.prototype, {
    user: function () {
      return $.extend({}, _user);
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
        case UserConstants.RECEIVED_FOLLOW_TOGGLE_REQUEST:
          updateFollowStatus(action.status.following);
          break;
      }
    })
  });
}());
