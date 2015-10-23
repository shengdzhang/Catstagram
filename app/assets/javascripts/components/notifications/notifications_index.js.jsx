var NotificationsIndex = React.createClass({
  getInitialState: function () {
    return { notifications: [] };
  },
  componentDidMount: function () {
    NotificationStore.addChangeListener(this._onChange);
    ApiUtil.fetchAllNotifications();
  },
  componentWillUnmount: function () {
    NotificationStore.removeChangeListener(this._onChange);
  },
  _onChange: function () {
    this.setState({ notifications: NotificationStore.all() });
  },
  render: function () {
    return (
      <ul className="list-group">
        {
          this.state.notifications.map(function (notification) {
            return <NotificationsIndexItem notification={notification} key={notification.id} />
          })
        }
      </ul>
    );
  }
});
