(function(root) {
  'use strict';
  var CHANGE_EVENT = "CHANGE_EVENT";
  var FAVORITE_EVENT = "FAVORITE_EVENT";

  var _posts = [];
  var _detailedPost = null;

  function resetPosts(posts) {
    _posts = posts;
    PostStore.changed();
  }

  function receiveEditedPost(post) {
    _posts.forEach(function (p, index) {
      if (p.id === post.id) {
        _posts[index] = post;
      }
    });
    PostStore.changed();
  }

  function removePost(postId) {
    _posts.forEach(function (p, index) {
      if (p.id === postId) {
        _posts.splice(index, 1);
      }
    });
    PostStore.changed();
  }

  function receiveSinglePost(post) {
    _detailedPost = post;
    _posts.unshift(post);
    PostStore.changed();
  }

  function toggleFavorite(postId, status) {
    _posts.forEach(function (p, index) {
      if (p.id === postId) {
        _posts[index].favorited = status.favorited;
        if (status.favorited) {
          _posts[index].likers.push({ id: window.CURRENT_USER_ID, username: window.CURRENT_USER_USERNAME });
        } else {
          _posts[index].likers.forEach(function (user, likersIndex) {
            if (user.id === window.CURRENT_USER_ID) {
              _posts[index].likers.splice(likersIndex, 1);
            }
          });
        }
      }
    });
    PostStore.changed();
  }

  function addCommentToPost(comment) {
    _posts.forEach(function (p, index) {
      if (p.id === comment.post_id) {
        _posts[index].comments.unshift(comment);
      }
    });
    PostStore.changed();
  }

  function removeCommentFromPost(postId, commentId) {
    _posts.forEach(function (p, index) {
      if (p.id === postId) {
        _posts[index].comments.forEach(function (comment, commentIndex) {
          if (comment.id === parseInt(commentId)) {
            _posts[index].comments.splice(commentIndex, 1);
          }
        });
      }
    });
    PostStore.changed();
  }

  root.PostStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _posts.slice();
    },
    detailedPost: function () {
      return $.extend({}, _detailedPost);
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
        case PostConstants.RECEIVED_FAVORITE_TOGGLE_REQUEST:
          toggleFavorite(action.postId, action.status);
          break;
        case PostConstants.RECEIVED_COMMENT:
          addCommentToPost(action.comment);
          break;
        case PostConstants.DELETED_COMMENT:
          removeCommentFromPost(action.postId, action.commentId);
          break;
      }
    })
  });
}(this));
