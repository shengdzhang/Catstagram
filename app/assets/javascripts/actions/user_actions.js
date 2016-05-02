var UserActions = {

  receiveUser: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVED_USER,
      user: user
    });
  },

  receiveMain: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVED_MAIN,
      user: user
    });
  },

  receiveFollowToggleRequest: function (status) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVED_FOLLOW_TOGGLE_REQUEST,
      status: status
    });
  },

  receiveMainFollowToggleRequest: function (status, userId) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVED_MAIN_FOLLOW_TOGGLE_REQUEST,
      status: status,
      userId: userId
    });
  },

  getAllUsers: function(users){
    AppDispatcher.dispatch({
      actionType: UserConstants.FETCH_USERS,
      users: users
    });
  }
};
