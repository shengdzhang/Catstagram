var PostActions = {
  receiveEditedPost: function (post) {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVED_EDITED_POST,
      post: post
    });
  },
  receiveSinglePost: function (post) {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVED_SINGLE_POST,
      post: post
    });
  },
  receiveFeed: function (posts) {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVED_FEED_ITEMS,
      posts: posts
    });
  },
  receiveToggledFavorite: function (postId, status) {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVED_FAVORITE_TOGGLE_REQUEST,
      postId: postId,
      status: status
    });
  },
  receiveComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVED_COMMENT,
      comment: comment
    });
  },
  deleteComment: function (postId, commentId) {
    AppDispatcher.dispatch({
      actionType: PostConstants.DELETED_COMMENT,
      postId: postId,
      commentId: commentId
    });
  },
  deletedPost: function (postId) {
    AppDispatcher.dispatch({
      actionType: PostConstants.DELETED_POST,
      postId: postId
    });
  }
};
