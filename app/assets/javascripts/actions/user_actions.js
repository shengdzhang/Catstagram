var UserActions = {
  receiveUser: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVED_USER,
      user: user
    });
  },
  receiveFollowToggleRequest: function (status) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVED_FOLLOW_TOGGLE_REQUEST,
      status: status
    });
  }
};
