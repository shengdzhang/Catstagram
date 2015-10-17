var ProfileInformation = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return { editingBiography: false,
             biography: this.props.user.biography,
             following: ProfileStore.following(),
             editingProfilePic: false };
  },
  componentDidMount: function () {
    ProfileStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function () {
    ProfileStore.removeChangeListener(this._onChange);
  },
  editProfile: function () {
    this.setState({ editingBiography: true });
  },
  updateProfile: function (e) {
    e.preventDefault();

    ApiUtil.updateUser({ biography: this.state.biography });
    this.setState({ editingBiography: false });
  },
  toggleFollow: function () {
    ApiUtil.toggleFollow(this.props.user.id, this.state.following);
  },
  _onChange: function () {
    this.setState({ following: ProfileStore.following() });
  },
  render: function () {
    return (
      <div>
        <div className="page-header">
          {
            this.props.user.id === window.CURRENT_USER_ID ?
              (!this.state.editing ? <a onClick={this.editProfile}>Edit</a> : "") :
              (
                this.state.following ?
                <button className="btn btn-default" onClick={this.toggleFollow}>Unfollow</button> :
                <button className="btn btn-primary" onClick={this.toggleFollow}>Follow</button>
              )
          }
          <h1>
            {
              this.props.user.id === window.CURRENT_USER_ID ?
              <a data-toggle="modal" data-target="#smallModal"><img className="profile-pic" src={this.props.user.profile_pic_url} /></a> :
              <img className="profile-pic" src={this.props.user.profile_pic_url} />
            }
            <small>{this.props.user.username}</small>
          </h1>
          <div className="profile-information wrapword">
            {
              this.state.editingBiography ?
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
