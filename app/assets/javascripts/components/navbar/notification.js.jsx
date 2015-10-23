var Notification = React.createClass({
  render: function () {
    return (
      <li><a href={this.props.notification.href}>{this.props.notification.message}</a></li>
    );
  }
});
