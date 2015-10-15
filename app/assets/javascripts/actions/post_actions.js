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
  }
};
