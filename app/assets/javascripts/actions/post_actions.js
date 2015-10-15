var PostActions = {
  receiveAllPostsForUser: function (posts) {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVED_ALL_POSTS_FROM_USER,
      posts: posts
    });
  },
  receiveSinglePost: function (post) {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVED_SINGLE_POST,
      post: post
    });
  }
};