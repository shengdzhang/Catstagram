var PostActions = {
  receiveAllPostsForUser: function (posts) {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVED_ALL_POSTS_FROM_USER,
      posts: posts
    });
  },
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
  deletedPost: function (postId) {
    AppDispatcher.dispatch({
      actionType: PostConstants.DELETED_POST,
      postId: postId
    });
  }
};
