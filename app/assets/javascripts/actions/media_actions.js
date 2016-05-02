var MediaActions = {

  receiveSingleMedium: function (medium) {
    AppDispatcher.dispatch({
      actionType: MediaConstants.RECEIVED_SINGLE_MEDIUM,
      medium: medium
    });
  },

  deletedMedium: function (mediumId) {
    AppDispatcher.dispatch({
      actionType: MediaConstants.DELETED_MEDIUM,
      mediumId: mediumId
    });
  },

  receiveEditedMedium: function (medium) {
    AppDispatcher.dispatch({
      actionType: MediaConstants.RECEIVED_EDITED_MEDIUM,
      medium: medium
    });
  },

  receiveToggledLike: function (mediumId, status) {
    AppDispatcher.dispatch({
      actionType: MediaConstants.RECEIVED_LIKE_TOGGLE_REQUEST,
      mediumId: mediumId,
      status: status
    });
  },

  receiveComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: MediaConstants.RECEIVED_COMMENT,
      comment: comment
    });
  }

};
