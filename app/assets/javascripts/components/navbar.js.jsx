var Navbar = React.createClass({
  logOut: function () {
    ApiUtil.logOut();
  },
  render: function () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Pixor</a>
            <ul className="nav navbar-nav">
              <li><a><span className="glyphicon glyphicon-search"></span></a></li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown" role="presentation">
                <a className="dropdown-toggle" data-toggle="dropdown"
                   role="button" aria-haspopup="true" aria-expanded="false">
                   Activity <span className="badge">7</span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">These</a></li>
                  <li><a href="#">are</a></li>
                  <li><a href="#">sample</a></li>
                  <li><a href="#">notifications,</a></li>
                  <li><a href="#">not</a></li>
                  <li><a href="#">real</a></li>
                  <li><a href="#">ones.</a></li>
                </ul>
              </li>
              <li><a href="#/posts/upload" className="glyphicon glyphicon-camera"></a></li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown"
                   role="button" aria-haspopup="true" aria-expanded="false">
                    {window.CURRENT_USER_USERNAME} <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">Profile</a></li>
                  <li><a href="#">Account Settings</a></li>
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
