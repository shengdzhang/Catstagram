var Navbar = React.createClass({

  mixins: [ReactRouter.History],

  componentDidMount: function () {
    ApiUtil.getUsers();
  },

  handleProfile: function () {
    var url = "users/" + window.CURRENT_USER_ID;
    this.history.pushState(null, url);
  },

  handleSettings: function () {
    var url = "settings";
    this.history.pushState(null, url);
  },

  handleUpload: function () {
    var url = "media/upload";
    this.history.pushState(null, url);
  },

  handleLogOut: function () {
    ApiUtil.logOut();
  },

  home: function () {
    var url = "#";
    this.history.pushState(null, url);
  },

  about: function () {
    var followers ='<div className="nav-dialog-about"> Hello. This is a full stack website designed using Ruby on Rails and jReact. It is used purely for educational/presentation purposes. Images are from google and I do not own any of them. </div> <br/> <div>Sheng Da Zhang<div>';

    BootstrapDialog.show({
      title: "About",
      message: followers
    });
  },

  render: function () {
    return (
      <nav className="my-navbar">
        <div className="container-fluid">

          <div className="navbar-header">
            <a className="navbar-logo" onClick={this.home}>Catstagram</a>
          </div>

          <div className="navbar-about">
            <a onClick={this.about}>About</a>
          </div>

          <div className="collapse navbar-collapse">

            <ul className="nav navbar-nav navbar-right">
              <li className="nav-center">
                <Search />
              </li>

              <li className="profile-wrapper">
                <strong>
                  {window.CURRENT_USER_USERNAME} <span className="caret"></span>
                </strong>

                <div className="profile-content">
                  <ul className="list-group">
                    <li className="list-group-item" onClick={this.handleProfile}>Profile</li>
                    <li className="list-group-item" onClick={this.handleSettings}>Settings</li>
                    <li className="list-group-item" onClick={this.handleUpload}>Upload</li>
                    <li className="list-group-item" onClick={this.handleLogOut}>Logout</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
