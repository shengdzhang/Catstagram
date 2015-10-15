var ApiUtil = {
  createPost: function (postParams) {
    $.ajax({
      url: 'api/users/' + window.CURRENT_USER_ID + '/posts',
      type: 'POST',
      data: { post: postParams },
      dataType: 'json',
      success: function (post) {
        PostActions.editPost(post);
        window.location.href = "/";
      }
    });
  },
  fetchAllPostsFromUser: function (userId) {
    $.ajax({
      url: 'api/users/' + userId + '/posts',
      type: 'GET',
      dataType: 'json',
      success: function (posts) {
        PostActions.receiveAllPostsForUser(posts);
      }
    });
  },
  fetchSinglePost: function (postId) {
    $.ajax({
      url: 'api/posts/' + postId,
      type: 'GET',
      dataType: 'json',
      success: function (post) {
        debugger;
      }
    });
  },
  deletePost: function (postId) {
    $.ajax({
      url: 'api/posts/' + postId,
      type: 'DELETE',
      success: function () {
        window.location.href = "/";
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
