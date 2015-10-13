var Navbar = React.createClass({
  logOut: function () {
    SessionUtil.logOut();
  },
  render: function () {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Pixor</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form navbar-left" role="search">
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">
                  <span className="glyphicon glyphicon-search"></span>
                </span>
                <input type="text" className="form-control" placeholder="Search" aria-describedby="basic-addon1" />
              </div>
            </form>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#" className="glyphicon glyphicon-camera"></a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown"
                   role="button" aria-haspopup="true" aria-expanded="false">
                    {window.CURRENT_USER_USERNAME} <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">Item1</a></li>
                  <li><a href="#">Item2</a></li>
                  <li><a href="#">Item3</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#" onClick={this.logOut}>Log out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
