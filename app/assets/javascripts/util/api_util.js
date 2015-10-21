var ApiUtil = {
  createPost: function (postParams, callback) {
    $.ajax({
      url: 'api/posts',
      type: 'POST',
      data: { post: postParams },
      dataType: 'json',
      success: function (post) {
        PostActions.receiveSinglePost(post);
        window.location.href = "#";
        callback(post);
      }
    });
  },
  addTagsToPost: function (postId, tags) {
    $.ajax({
      url: 'api/posts/' + postId + '/taggings',
      type: 'DELETE',
      dataType: 'json',
      success: function () {
        tags.split(" ").forEach(function (tag) {
          $.ajax({
            url: 'api/posts/' + postId + '/taggings',
            type: 'POST',
            data: { tag: tag },
            dataType: 'json',
            success: function () {

            }
          });
        });
      }
    });
  },
  fetchFeed: function () {
    $.ajax({
      url: 'api/posts',
      type: 'GET',
      dataType: 'json',
      success: function (posts) {
        PostActions.receiveFeed(posts);
      }
    });
  },
  fetchSinglePost: function (postId) {
    $.ajax({
      url: 'api/posts/' + postId,
      type: 'GET',
      dataType: 'json',
      success: function (post) {
        PostActions.receiveSinglePost(post);
      }
    });
  },
  deletePost: function (postId) {
    $.ajax({
      url: 'api/posts/' + postId,
      type: 'DELETE',
      success: function () {
        PostActions.deletedPost(postId);
      }
    });
  },
  updatePost: function (postId, postParams) {
    $.ajax({
      url: 'api/posts/' + postId,
      type: 'PATCH',
      data: { post: postParams },
      dataType: 'json',
      success: function (post) {
        PostActions.receiveEditedPost(post);
      }
    });
  },
  fetchUser: function (userId) {
    $.ajax({
      url: 'api/users/' + userId,
      type: 'GET',
      dataType: 'json',
      success: function (user) {
        UserActions.receiveUser(user);
      }
    });
  },
  updateUser: function (userParams) {
    $.ajax({
      url: 'api/users/' + window.CURRENT_USER_ID,
      type: 'PATCH',
      data: { user: userParams },
      success: function (user) {
        UserActions.receiveUser(user);
      }
    });
  },
  fetchUserSearchResults: function (query) {
    $.ajax({
      url: 'api/users',
      type: 'GET',
      data: { query: query },
      dataType: 'json',
      success: function (results) {
        SearchActions.receiveUserSearchResults(results);
      }
    });
  },
  fetchPostSearchResults: function (tag) {
    $.ajax({
      url: 'api/tags/' + tag,
      type: 'GET',
      dataType: 'json',
      success: function (posts) {
        debugger;
      }
    });
  },
  toggleFavorite: function (postId, favorited) {
    var type = (favorited ? 'DELETE' : 'POST');

    $.ajax({
      url: 'api/posts/' + postId + '/togglefavorite',
      type: type,
      dataType: 'json',
      success: function (status) {
        PostActions.receiveToggledFavorite(postId, status);
      }.bind(this)
    });
  },
  toggleFollow: function (userId, following) {
    var type = (following ? 'DELETE' : 'POST');
    var action = (following ? 'unfollow/' : 'follow/');
    var url = 'api/' + action + userId;

    $.ajax({
      url: url,
      type: type,
      dataType: 'json',
      success: function (status) {
        UserActions.receiveFollowToggleRequest(status);
      }
    });
  },
  createComment: function (postId, comment, callback) {
    $.ajax({
      url: 'api/posts/' + postId + '/comments',
      type: 'POST',
      data: { comment: comment },
      dataType: 'json',
      success: function (comment) {
        PostActions.receiveComment(comment);
        if (callback) {
          callback(comment);
        }
      }.bind(this)
    });
  },
  deleteComment: function (postId, commentId, callback) {
    $.ajax({
      url: 'api/comments/' + commentId,
      type: 'DELETE',
      dataType: 'json',
      success: function () {
        PostActions.deleteComment(postId, commentId);
        if (callback) {
          callback();
        }
      }.bind(this)
    });
  },
  logOut: function () {
    $.ajax({
      url: 'session',
      type: 'DELETE',
      success: function () {
        window.location.href = "/";
      }
    });
  }
};
