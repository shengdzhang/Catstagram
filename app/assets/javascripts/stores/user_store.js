(function(root) {

  'use strict';
  var _users = [];
  var CHANGE_EVENT = 'changed';
  var _currentUser = {};

  var resetUsers = function (users){
    _users = users.slice();
    _currentUser = UserStore.getUser(CURRENT_USER_ID);
    UserStore.changed();
  };

  var updateUser = function (user) {
    user.media.sort(function(media1, media2) {
      return media1.id - media2.id;
    });
    user.media = user.media.splice(user.media.length-4, 3);
    _users.splice(UserStore.findUser(user.id), 1, user);
    UserStore.changed();
  };

  var updateFollowStatus = function (status, userId) {
    var _following = status;
    var _user = UserStore.getUser(userId);
    if (status) {
      _user.followers.unshift({ id: window.CURRENT_USER_ID, username: window.CURRENT_USER_USERNAME });
    } else {
      _user.followers.forEach(function (follower, index) {
        if (follower.id === window.CURRENT_USER_ID) {
          _user.followers.splice(index, 1);
        }
      });
    }
    _user.following = !_user.following;
    _users.splice(UserStore.findUser(_user.id), 1, _user);
    UserStore.changed();
  };

  var UserStore = root.UserStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      var users = _users.slice();
      users.splice(UserStore.findGuest(users),1);
      var current = UserStore.findUser(CURRENT_USER_ID, users);
      users.splice(current, 1);
      return users;
    },

    //Fisher Yates Shuffle
    shuffle: function () {
      var i = 0,
          j = 0,
          temp = null;

      var users = this.all();

      for (i = users.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = users[i];
        users[i] = users[j];
        users[j] = temp;
      }

      return users;
    },

    getUser: function (id) {

      var idx = this.findUser(id);

      if(idx !== undefined) {
        return _users[idx];
      } else if(id === _currentUser.id){
        return this.getCurrentUser();
      }
    },

    findUser: function (id, arr) {
      var users = arr || _users;
      for(var i=0; i < users.length; i++){
        if(users[i].id === id) {
          return i;
        }
      }
    },

    findGuest: function(arr) {
      for(var i=0; i < arr.length; i++){
        if(arr[i].username === "guest") {
          return i;
        }
      }
    },

    findUserName: function (id) {
      var idx = this.findUser(id);
      if (idx !== undefined) {
        return _users[idx].displayname;
      }
    },

    findUserPic: function (id) {
      var idx = this.findUser(id);
      if (idx !== undefined) {
        return _users[idx].profile_pic_url;
      }
    },

    changed: function () {
      this.emit(CHANGE_EVENT);
    },

    getCurrentUser: function () {
      return $.extend({}, _currentUser);
    },

    getShowUser: function () {
      return $.extend({},_user);
    },

    addChangeListener: function (callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case UserConstants.FETCH_USERS:
          resetUsers(payload.users);
          break;
        case UserConstants.RECEIVED_MAIN:
          updateUser(payload.user);
          break;
        case UserConstants.RECEIVED_MAIN_FOLLOW_TOGGLE_REQUEST:
          updateFollowStatus(payload.status.following, payload.userId);
          break;
      }
    })
  });

}(this));
