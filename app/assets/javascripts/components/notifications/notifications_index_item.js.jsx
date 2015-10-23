var NotificationsIndexItem = React.createClass({
  navigate: function () {
    window.location.href = this.props.notification.href;
  },
  render: function () {
    return (
      <li className="list-group-item notifications-index-item clearfix" onClick={this.navigate}>
        <span className="pull-left">{this.props.notification.message}</span>
        <span className="pull-right">{jQuery.timeago(this.props.notification.created_at)}</span>
      </li>
    );
  }
});
