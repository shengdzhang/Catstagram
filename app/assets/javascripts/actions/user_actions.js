var UserActions = {
  receiveUser: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVED_USER,
      user: user
    });
  }
};
