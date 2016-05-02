CommentActions = {

    createComment: function (comment) {
      AppDispatcher.dispatch({
        actionType: CommentConstants.ADD_COMMENT,
        comment: comment
      });
    },

    updateComment: function (comment) {
      AppDispatcher.dispatch({
        actionType: CommentConstants.UPDATE_COMMENT,
        comment: comment
      });
    },

    deleteComment: function (comment) {
      AppDispatcher.dispatch({
        actionType: CommentConstants.DELETE_COMMENT,
        comment: comment
      });
    }

};
