(function() {
  'use strict';
  var CHANGE_EVENT = "CHANGE_EVENT";

  var _users = [];
  var _tags = [];
  var _tagged_posts = [];

  function resetUserResults(results) {
    _users = results;
    SearchStore.changed();
  }

  function resetTagResults(results) {
    _tags = results;
    SearchStore.changed();
  }

  function resetTaggedPosts(posts) {
    _tagged_posts = posts;
    SearchStore.changed();
  }

  window.SearchStore = $.extend({}, EventEmitter.prototype, {
    users: function () {
      return _users.slice();
    },
    tags: function () {
      return _tags.slice();
    },
    posts: function () {
      return _tagged_posts.slice();
    },
    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },
    changed: function () {
      this.emit(CHANGE_EVENT);
    },
    dispatcherId: AppDispatcher.register(function (action) {
      switch (action.actionType) {
        case SearchConstants.RECEIVED_USER_SEARCH_RESULTS:
          resetUserResults(action.results);
          break;
        case SearchConstants.RECEIVED_TAG_SEARCH_RESULTS:
          resetTagResults(action.results);
          break;
        case SearchConstants.RECEIVED_POSTS_FROM_TAG_SEARCH:
          resetTaggedPosts(action.posts);
          break;
      }
    })
  });
}());
