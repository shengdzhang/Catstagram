var AccountSettings = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return { password: "", newPassword: "", newPasswordConfirmation: "", error: "" };
  },
  updateAccount: function () {
    this.setState({ error: "" });
    if (this.state.newPassword === this.state.newPasswordConfirmation) {
      ApiUtil.updateUser({ current_password: this.state.password, password: this.state.newPassword }, function (message) {
        if (message) {
          this.setState({ error: message });
        } else {
          window.location.href = "#";
        }
      }.bind(this));
    } else {
      this.setState({ error: "Password confirmation does not match password." });
    }
    this.setState({ password: "", newPassword: "", newPasswordConfirmation: "" });
  },
  render: function () {
    return (
      <div className="well account-settings">
        {
          this.state.error ?
          <div className="alert alert-warning">{ this.state.error }</div> :
          ""
        }
        <h1>Account Settings</h1>
        <div className="form-group settings-form">
          <input className="form-control" type="password" placeholder="Current Password" valueLink={this.linkState("password")} />
          <br />
          <input className="form-control" type="password" placeholder="New Password" valueLink={this.linkState("newPassword")} />
          <input className="form-control" type="password" placeholder="Confirm New Password" valueLink={this.linkState("newPasswordConfirmation")} />
          <br />
          <button className="btn btn-primary form-control" onClick={this.updateAccount}>Update Account</button>
        </div>
      </div>
    );
  }
});
