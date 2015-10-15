var Navbar = React.createClass({
  logOut: function () {
    ApiUtil.logOut();
  },
  render: function () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid col-xs-offset-2 col-xs-8">
          <div className="navbar-header col-xs-3">
            <a className="navbar-brand" href="#">Pixor</a>
          </div>
          <div className="col-xs-1" />
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form navbar-left" role="search">
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">
                  <span className="glyphicon glyphicon-search"></span>
                </span>
                <input type="text" className="form-control" placeholder="Search" aria-describedby="basic-addon1" />
              </div>
            </form>
            <div className="col-xs-1" />
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown" role="presentation">
                <a className="dropdown-toggle" data-toggle="dropdown"
                   role="button" aria-haspopup="true" aria-expanded="false">
                   Activity <span className="badge">3</span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">Notification1</a></li>
                  <li><a href="#">Notification2</a></li>
                  <li><a href="#">Notification3</a></li>
                </ul>
              </li>
              <li><a href="#/posts/upload" className="glyphicon glyphicon-camera"></a></li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown"
                   role="button" aria-haspopup="true" aria-expanded="false">
                    {window.CURRENT_USER_USERNAME} <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">Item1</a></li>
                  <li><a href="#">Item2</a></li>
                  <li><a href="#">Item3</a></li>
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
