(function(root) {
  'use strict';
  var CHANGE_EVENT = "CHANGE_EVENT";
  var FAVORITE_EVENT = "FAVORITE_EVENT";

  var _posts = [];

  function resetPosts(posts) {
    _posts = posts;
    PostStore.changed();
  }

  function receiveEditedPost(post) {
    _posts.forEach(function (p, index) {
      if (p.id === post.id) {
        _posts[index] = post;
        PostStore.changed();
      }
    });
  }

  function removePost(postId) {
    _posts.forEach(function (p, index) {
      if (p.id === postId) {
        _posts.splice(index, 1);
        PostStore.changed();
      }
    });
  }

  function receiveSinglePost(post) {
    _posts.unshift(post);
  }

  root.PostStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _posts.slice();
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
        case PostConstants.RECEIVED_FEED_ITEMS:
          resetPosts(action.posts);
          break;
        case PostConstants.RECEIVED_EDITED_POST:
          receiveEditedPost(action.post);
          break;
        case PostConstants.DELETED_POST:
          removePost(action.postId);
          break;
        case PostConstants.RECEIVED_SINGLE_POST:
          receiveSinglePost(action.post);
          break;
      }
    })
  });
}(this));
