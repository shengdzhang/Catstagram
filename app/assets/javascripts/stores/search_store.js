(function() {
  'use strict';
  var CHANGE_EVENT = "CHANGE_EVENT";

  var _results = [];
  var _tagged_posts = [];

  function resetResults(results) {
    _results = results;
    SearchStore.changed();
  }

  function resetTaggedPosts(posts) {
    _tagged_posts = posts;
    SearchStore.changed();
  }

  window.SearchStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _results.slice();
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
        case SearchConstants.RECEIVED_SEARCH_RESULTS:
          resetResults(action.results);
          break;
        case SearchConstants.RECEIVED_POSTS_FROM_TAG_SEARCH:
          resetTaggedPosts(action.posts);
          break;
      }
    })
  });
}());
