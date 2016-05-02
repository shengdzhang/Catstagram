var UserEditpage = React.createClass ({

  getInitialState: function () {
    var user = UserStore.getCurrentUser();
    if (user) {
      return {user: user, description: user.description, password: "", newPassword: "", newPasswordConfirmation: "", url: user.profile_pic_url, error: "", togglePassword: false};
    } else {
      return {};
    }
  },

  componentDidMount: function () {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    var user = UserStore.getCurrentUser();
    this.setState({user: user, description: user.description, password: "", newPassword: "", newPasswordConfirmation: "", url: user.profile_pic_url, error: ""});
  },

  changeDescription: function (e) {
    this.setState({description: e.target.value});
  },

  changePassword: function (e) {
    this.setState({password: e.target.value});
  },

  changeNewPassword: function (e) {
    this.setState({newPassword: e.target.value});
  },

  changeNewPasswordConfirmation: function (e) {
    this.setState({newPasswordConfirmation: e.target.value});
  },

  password: function () {

    if (!this.state.togglePassword) {
      return (
        <div className="edit-no-pw">
          <button className="edit-toggle-password" onClick={this.togglePW}>Change Password</button>
          <p className="edit-no-pw-message"> ^ Click to toggle password change options. </p>
        </div>
      );
    } else {
      return (
        <div>
          <button className="edit-toggle-password" onClick={this.togglePW}>Change Password</button>
          <label> Enter Password </label>
          <input className="edit-password" type="password" onChange={this.changePassword} value={this.state.password}/>
          <label> Enter New Password </label>
          <input className="edit-password" type="password" onChange={this.changeNewPassword} value={this.state.newPassword}/>
          <label> Confirm New Password </label>
          <input className="edit-password" type="password" onChange={this.changeNewPasswordConfirmation} value={this.state.newPasswordConfirmation}/>

        </div>
      );
    }
  },

  togglePW: function () {
    this.setState({togglePassword: !this.state.togglePassword});
  },

  reset: function () {
    this.setState({description: this.state.user.description, password: "", newPassword: "", newPasswordConfirmation: "", url: this.state.user.profile_pic_url, error: ""});
  },

  onSubmit: function (e) {
    e.preventDefault();

    this.setState({ error: "" });
    if (this.state.password === "" && this.state.newPassword === "" && this.state.newPasswordConfirmation === "") {
      ApiUtil.editUser({ profile_pic_url: this.state.url, description: this.state.description });
      window.location.href = "#/users/" + this.state.user.id;
    } else if (this.state.newPassword === this.state.newPasswordConfirmation) {
      ApiUtil.updateUser({ current_password: this.state.password, password: this.state.newPassword, profile_pic_url: this.state.url, description: this.state.description }, function (message) {
        if (message) {
          this.setState({ error: message });
        } else {
          window.location.href = "#/users/" + this.state.user.id;
        }
      }.bind(this));
    }
    else {
      this.setState({ error: "Password confirmation does not match password." });
    }
    this.setState({ password: "", newPassword: "", newPasswordConfirmation: "" });
  },

  handleLink: function (e) {
    e.preventDefault();
    var options = {
                    upload_preset: 'lg2jfbk8',
                    cloud_name: 'catstagram',
                    theme: 'minimal',
                    cropping: 'server',
                    cropping_aspect_ratio: 1,
                    cropping_default_selection_ratio: 1,
                  };
    cloudinary.openUploadWidget(options, this.handleResponse);
  },

  handleResponse: function (error, result) {
    if(error) {
      console.log(error);
    } else {
      var url = "https://res.cloudinary.com/catstagram/image/upload/h_600,w_600/" + result[0].path;
      this.setState({url: url});
    }
  },

  render: function () {
    var url = this.state.url || "http://res.cloudinary.com/catstagram/image/upload/v1445014670/g6xesy4cm99zroz96rcc.png";
    return (

      <div className = "user-edit-wrapper">
        {
          this.state.error ?
          <div className="alert alert-warning">{ this.state.error }</div> :
          ""
        }
        <h1 className="user-edit">
          Hello {this.state.user.displayname}
        </h1>

        <form className = "edit-form-wrap">
          <label> Change Description </label>
          <textarea onChange={this.changeDescription} value={this.state.description}></textarea>

          {this.password()}

          <input type="submit" onClick={this.onSubmit} value="Submit"/>
          <button className="edit-reset" onClick={this.reset}>Reset</button>
        </form>
        <div className="profile-image-wrapper">
          <div className="profile-text"> Change Profile Picture. </div>
          <img className="profile-img" src={url}/>
          <div className="profile-button-wrapper">
            <button onClick={this.handleLink}> Upload </button>
          </div>
      </div>
      </div>
    );
  }

});
