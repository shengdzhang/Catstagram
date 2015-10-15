var Navbar = React.createClass({
  logOut: function () {
    ApiUtil.logOut();
  },
  render: function () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid col-xs-offset-3">
          <div className="row">
            <div className="navbar-header col-xs-4">
              <a className="navbar-brand" href="#">Pixor</a>
              <ul className="nav navbar-nav">
                <li><a><span className="glyphicon glyphicon-search"></span></a></li>
              </ul>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <div className="col-xs-4">
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
          </div>
        </div>
      </nav>
    );
  }
});
