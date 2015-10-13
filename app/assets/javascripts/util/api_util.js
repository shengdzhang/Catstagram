var ApiUtil = {
  createPost: function (postParams) {
    $.ajax({
      url: 'api/posts',
      type: 'POST',
      data: { post: postParams },
      dataType: 'json',
      success: function (post) {
        debugger;
      }
    });
  },
  fetchSinglePost: function (id) {
    $.ajax({
      url: 'api/posts/' + id,
      type: 'GET',
      dataType: 'json',
      success: function (post) {
        debugger;
      }
    });
  },
  deletePost: function (id) {
    $.ajax({
      url: 'api/posts/' + id,
      type: 'DELETE',
      dataType: 'json',
      success: function (message) {
        debugger;
      }
    });
  },
  updatePost: function (id, postParams) {
    $.ajax({
      url: 'api/posts/' + id,
      type: 'PATCH',
      data: { post: postParams },
      dataType: 'json',
      success: function (post) {
        debugger;
      }
    });
  }
};
