var SearchActions = {
  receiveSearchResults: function (results) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVED_SEARCH_RESULTS,
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
