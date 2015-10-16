var ProfileInformation = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return { editing: false, biography: this.props.user.biography };
  },
  editProfile: function () {
    this.setState({ editing: true });
  },
  updateProfile: function (e) {
    e.preventDefault();

    ApiUtil.updateUser({ biography: this.state.biography });
    this.setState({ editing: false });
  },
  render: function () {
    return (
      <div>
        <div className="page-header">
          {
            !this.state.editing && this.props.user.id === window.CURRENT_USER_ID ?
            <a onClick={this.editProfile}>Edit profile</a> : ""
          }
          <h1><img className="profile-pic" src={this.props.user.profile_pic_url} /><small>{this.props.user.username}</small></h1>
          <div className="profile-information">
            {
              this.state.editing ?
              <form className="form-group clearfix" onSubmit={this.updateProfile}>
                <textarea className="form-control" valueLink={this.linkState("biography")}
                          defaultValue={this.props.user.biography}></textarea>
                <button type="submit" className="btn btn-primary form-control">Update</button>
              </form> :
              <div>
                <p>{this.props.user.biography}</p>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
});
