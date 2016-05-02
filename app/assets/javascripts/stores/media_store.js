(function(root) {
  'use strict';
  var CHANGE_EVENT = "CHANGE_EVENT";
  var LIKE_EVENT = "LIKE_EVENT";

  var _media = [];
  var _detailedMedium = {};

  function receiveEditedMedium(medium) {
    _detailedMedium = medium;
    _media.forEach(function (p, index) {
      if (p.id === medium.id) {
        _media[index] = medium;
      }
    });
    MediaStore.changed();
  }

  function removeMedium(mediumId) {
    _media.forEach(function (p, index) {
      if (p.id === mediumId) {
        _media.splice(index, 1);
      }
    });
    MediaStore.changed();
  }

  function receiveSingleMedium(medium) {
    _detailedMedium = medium;
    _media.unshift(medium);
    MediaStore.changed();
  }

  function toggleLike(mediumId, status) {
    _media.forEach(function (p, index) {
      if (p.id === mediumId) {
        _media[index].liked = status.liked;
        if (status.liked) {
          _media[index].likers.push({ id: window.CURRENT_USER_ID, username: window.CURRENT_USER_USERNAME });
        } else {
          _media[index].likers.forEach(function (user, likersIndex) {
            if (user.id === window.CURRENT_USER_ID) {
              _media[index].likers.splice(likersIndex, 1);
            }
          });
        }
      }
    });
    MediaStore.changed();
  }

  function addCommentToMedium(comment) {
    _media.forEach(function (p, index) {
      if (p.id === comment.commentable_id) {
        _media[index].comments.push(comment);
      }
    });
    MediaStore.changed();
  }

  root.MediaStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      return _media.slice();
    },

    detailedMedium: function () {
      return $.extend({}, _detailedMedium);
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
      _detailedMedium = {};
      _media = [];
    },

    changed: function () {
      this.emit(CHANGE_EVENT);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case MediaConstants.RECEIVED_FEED_ITEMS:
          addMediaToFeed(payload.media);
          break;
        case MediaConstants.RECEIVED_EDITED_MEDIUM:
          receiveEditedMedium(payload.medium);
          break;
        case MediaConstants.DELETED_MEDIUM:
          removeMedium(payload.mediumId);
          break;
        case MediaConstants.RECEIVED_SINGLE_MEDIUM:
          receiveSingleMedium(payload.medium);
          break;
        case MediaConstants.RECEIVED_LIKE_TOGGLE_REQUEST:
          toggleLike(payload.mediumId, payload.status);
          break;
        case MediaConstants.RECEIVED_COMMENT:
          addCommentToMedium(payload.comment);
          break;
      }
    })
  });
}(this));
