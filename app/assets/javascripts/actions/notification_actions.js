var NotificationActions = {
  receiveNotificationDropdown: function (notifications) {
    AppDispatcher.dispatch({
      actionType: NotificationConstants.RECEIVED_NOTIFICATION_DROPDOWN,
      notifications: notifications
    });
  },
  receiveAllNotifications: function (notifications) {
    AppDispatcher.dispatch({
      actionType: NotificationConstants.RECEIVED_ALL_NOTIFICATIONS,
      notifications: notifications
    });
  },
  markAllAsRead: function () {
    AppDispatcher.dispatch({
      actionType: NotificationConstants.ALL_NOTIFICATIONS_MARKED_AS_READ
    });
  }
};
