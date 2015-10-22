var SearchActions = {
  receiveUserSearchResults: function (results) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVED_USER_SEARCH_RESULTS,
      results: results
    });
  },
  receiveTagSearchResults: function (results) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVED_TAG_SEARCH_RESULTS,
      results: results
    });
  },
  receivePostsFromTagSearch: function (posts) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVED_POSTS_FROM_TAG_SEARCH,
      posts: posts
    });
  }
};
