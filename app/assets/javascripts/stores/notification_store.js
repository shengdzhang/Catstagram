(function() {
  'use strict';
  var CHANGE_EVENT = "CHANGE_EVENT";

  var _notifications = [];

  function resetNotifications(notifications) {
    _notifications = notifications;
    NotificationStore.changed();
  }

  function markAllAsRead() {
    _notifications.forEach(function (notification) {
      notification.checked = true;
    });
    NotificationStore.changed();
  }

  window.NotificationStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _notifications.slice();
    },
    numUnread: function () {
      return _notifications.filter(function (n) {
        return !n.checked;
      }).length;
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
        case NotificationConstants.RECEIVED_NOTIFICATION_DROPDOWN:
          resetNotifications(action.notifications);
          break;
        case NotificationConstants.RECEIVED_ALL_NOTIFICATIONS:
          resetNotifications(action.notifications);
          break;
        case NotificationConstants.ALL_NOTIFICATIONS_MARKED_AS_READ:
          markAllAsRead();
          break;
      }
    })
  });
}());
