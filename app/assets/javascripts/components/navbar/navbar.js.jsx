var Navbar = React.createClass({
  getInitialState: function () {
    return { notifications: [] };
  },
  componentDidMount: function () {
    NotificationStore.addChangeListener(this._onChange);
    ApiUtil.fetchNotificationsDropdown();
    this.notificationInterval = setInterval(function () {
      ApiUtil.fetchNotificationsDropdown();
    }, 5000);
  },
  markAllNotificationsAsRead: function () {
    ApiUtil.markAllNotificationsAsRead();
  },
  logOut: function () {
    ApiUtil.logOut();
  },
  _onChange: function () {
    this.setState({ notifications: NotificationStore.all() });
  },
  render: function () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Pixor</a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <form className="navbar-form search-form">
                  <SearchIndex />
                </form>
              </li>
              <li className="dropdown" role="presentation">
                <a className="dropdown-toggle" data-toggle="dropdown"
                   role="button" aria-haspopup="true" aria-expanded="false"
                   onClick={this.markAllNotificationsAsRead}>
                   Activity {NotificationStore.numUnread() > 0 ? <span className="badge">{NotificationStore.numUnread()}</span> : ""}
                </a>
                <ul className="dropdown-menu scrollable-menu">
                  <li><a href="#/notifications">View All Notifications</a></li>
                  {
                    this.state.notifications.map(function (notification) {
                      return <Notification notification={notification} key={notification.id} />
                    })
                  }
                </ul>
              </li>
              <li><a href="#/posts/upload" className="glyphicon glyphicon-camera"></a></li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown"
                   role="button" aria-haspopup="true" aria-expanded="false">
                    {window.CURRENT_USER_USERNAME} <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href={"#/users/" + window.CURRENT_USER_ID}>Profile</a></li>
                  <li><a href="#/settings">Account Settings</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a onClick={this.logOut}>Log out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
