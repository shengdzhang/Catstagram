var SearchActions = {
  receiveUserSearchResults: function (results) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVED_USER_SEARCH_RESULTS,
      results: results
    });
  }
};
