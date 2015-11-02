var NotificationsIndex = React.createClass({
  getInitialState: function () {
    return { notifications: [] };
  },
  componentDidMount: function () {
    NotificationStore.addChangeListener(this._onChange);
    ApiUtil.fetchAllNotifications();
    this.interval = setInterval(ApiUtil.fetchAllNotifications, 5000);
  },
  componentWillUnmount: function () {
    NotificationStore.removeChangeListener(this._onChange);
    clearInterval(this.interval);
  },
  _onChange: function () {
    this.setState({ notifications: NotificationStore.all() });
  },
  render: function () {
    return (
      <ul className="list-group">
        {
          this.state.notifications.length > 0 ?
          this.state.notifications.map(function (notification) {
            return <NotificationsIndexItem notification={notification} key={notification.id} />
          }) :
          <li className="list-group-item clearfix">You have no notifications.</li>
        }
      </ul>
    );
  }
});
