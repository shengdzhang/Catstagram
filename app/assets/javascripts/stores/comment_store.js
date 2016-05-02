(function(root) {
  'use strict';
  var _comments = [];
  var CHANGE_EVENT = 'comments_change';

  var findComment = function (id) {
    for (var i = 0; i < _comments.length; i++) {
      if (id === _comments[i].id) {
        return i;
      }
    }
  };

  var updateComment = function (comment) {
    if (comment.commentable_type === "Medium") {
      _comments.push(comment);
    }
    else if (comment.commentable_type === "Comment") {
      _comments[findComment(comment.commentable_id)].comments.push(comment);
    }
    CommentStore.changed();
  };

  var editComment = function (comment) {
    if (comment.commentable_type === "Medium") {
      _comments[findComment(comment.id)].body = comment.body;
    }
    else if (comment.commentable_type === "Comment") {
      var nested = _comments[findComment(comment.commentable_id)].comments;
      for (var i = 0; i < nested.length; i++) {
        if (nested[i].id === comment.id) {
          nested[i].body = comment.body;
        }
      }
    }
    CommentStore.changed();
  };

  var deleteComment = function (comment) {
    if (comment.commentable_type === "Medium") {
      _comments.splice(findComment(comment.id),1);
    }
    else if (comment.commentable_type === "Comment") {
      var idx = -1;
      var nested = _comments[findComment(comment.commentable_id)].comments;
      for (var i = 0; i < nested.length; i++) {
        if (nested[i].id === comment.id) {
          idx = i;
        }
      }
      if (idx !== -1) {
        nested.splice(idx, 1);
      }
    }
    CommentStore.changed();
  };

  var CommentStore = root.CommentStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      return _comments.slice();
    },

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    fetchComment: function (id){
      var idx = findComment(id);
      var comment = _comments[idx];
      return $.extend({}, comment);
    },

    changed: function () {
      this.emit(CHANGE_EVENT);
    },

    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case CommentConstants.ADD_COMMENT:
          updateComment(payload.comment);
          break;
        case CommentConstants.UPDATE_COMMENT:
          editComment(payload.comment);
          break;
        case CommentConstants.DELETE_COMMENT:
          deleteComment(payload.comment);
          break;
      }
    })
  });
}(this));
