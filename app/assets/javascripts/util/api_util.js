var ApiUtil = {

  // Media
  createMedium: function (mediumParams) {
    $.ajax({
      url: 'api/media',
      method: 'POST',
      data: { medium: mediumParams },
      dataType: 'json',
      success: function (medium) {
        MediaActions.receiveSingleMedium(medium);
      }
    });
  },

  fetchSingleMedium: function (mediumId) {
    $.ajax({
      url: 'api/media/' + mediumId,
      method: 'GET',
      dataType: 'json',
      success: function (medium) {
        MediaActions.receiveSingleMedium(medium);
      }
    });
  },

  deleteMedium: function (mediumId, callback) {
    $.ajax({
      url: 'api/media/' + mediumId,
      method: 'DELETE',
      success: function () {
        MediaActions.deletedMedium(mediumId);
        if (callback) {
          callback();
        }
      }
    });
  },

  updateMedium: function (mediumId, mediumParams) {
    $.ajax({
      url: 'api/media/' + mediumId,
      method: 'PATCH',
      data: { medium: mediumParams },
      dataType: 'json',
      success: function (medium) {
        MediaActions.receiveEditedMedium(medium);
      }
    });
  },

  // Users

  getUsers: function(){
    $.ajax({
      url: "api/users",
      method: "GET",
      success: function(users) {
        UserActions.getAllUsers(users);
      }
    });
  },

  fetchUser: function (userId) {
    $.ajax({
      url: 'api/users/' + userId,
      method: 'GET',
      dataType: 'json',
      success: function (user) {
        UserActions.receiveUser(user);
      }
    });
  },

  fetchMain: function (userId) {
    $.ajax({
      url: 'api/users/' + userId,
      method: 'GET',
      dataType: 'json',
      success: function (user) {
        UserActions.receiveMain(user);
      }
    });
  },

  updateUser: function (userParams, callback) {
    $.ajax({
      url: 'api/users/' + window.CURRENT_USER_ID,
      method: 'PATCH',
      data: { user: userParams, type: "Update" },
      dataType: 'json',
      success: function (user) {
        if (callback) {
          callback();
        } else {
          UserActions.receiveUser(user);
        }
      },
      error: function (message) {
        callback(message.responseText);
      }
    });
  },

  editUser: function (userParams) {
    $.ajax({
      url: 'api/users/' + window.CURRENT_USER_ID,
      method: 'PATCH',
      data: { user: userParams, type: "Edit" },
      dataType: 'json',
      success: function (user) {
        UserActions.receiveUser(user);
      }
    });
  },

  // Toggles
  toggleLike: function (mediumId, liked) {
    var type = (liked ? 'DELETE' : 'POST');

    $.ajax({
      url: 'api/media/' + mediumId + '/togglelike',
      method: type,
      dataType: 'json',
      success: function (status) {
        MediaActions.receiveToggledLike(mediumId, status);
      }.bind(this)
    });
  },

  toggleFollow: function (userId, following) {
    var type = (following ? 'DELETE' : 'POST');
    var action = (following ? 'unfollow/' : 'follow/');
    var url = 'api/' + action + userId;

    $.ajax({
      url: url,
      method: type,
      dataType: 'json',
      success: function (status) {
        UserActions.receiveFollowToggleRequest(status);
      }
    });
  },

  toggleMainFollow: function (userId, following) {
    var type = (following ? 'DELETE' : 'POST');
    var action = (following ? 'unfollow/' : 'follow/');
    var url = 'api/' + action + userId;

    $.ajax({
      url: url,
      method: type,
      dataType: 'json',
      success: function (status) {
        UserActions.receiveMainFollowToggleRequest(status, userId);
      }
    });
  },


  //Comments
  createMediaComment: function (mediumId, comment) {
    $.ajax({
      url: 'api/comments',
      method: 'POST',
      data: {"type": "Medium", "type_id": mediumId, "body": comment},
      dataType: 'json',
      success: function (comment) {
        MediaActions.receiveComment(comment);
      }.bind(this)
    });
  },

  createNestedComment: function(commentId, comment){
    $.ajax ({
      url: "/api/comments",
      method: "POST",
      data: {"type": "Comment", "type_id": commentId, "body": comment},
      datatype: "JSON",
      success: function (comment) {
        CommentActions.createComment(comment);
      }.bind(this)
    });
  },

  deleteComment: function (commentId) {
    $.ajax({
      url: 'api/comments/' + commentId,
      method: 'DELETE',
      dataType: 'json',
      success: function (comment) {
        CommentActions.deleteComment(comment);
      }.bind(this)
    });
  },

  fetchComment: function(id) {
    $.ajax ({
      url: "/api/comments/" +id,
      method: "GET",
      datatype: "JSON",
      success: function (comment) {
        CommentActions.createComment(comment);
      }
    });
  },

  updateComment: function (id, text) {
    $.ajax ({
      url: "/api/comments/" +id,
      method: "PATCH",
      data: {"body": text},
      datatype: "JSON",
      success: function (comment) {
        CommentActions.updateComment(comment);
      }
    });
  },

  // Session
  logOut: function () {
    $.ajax({
      url: 'session',
      method: 'DELETE',
      success: function () {
        window.location.href = "/";
      }
    });
  }
};
