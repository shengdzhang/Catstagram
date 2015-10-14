var PostActions = {
  receiveAllPostsForUser: function (posts) {
    AppDispatcher.dispatch({
      actionType: PostConstants.RECEIVED_ALL_POSTS_FROM_USER,
      posts: posts
    });
  }
};
