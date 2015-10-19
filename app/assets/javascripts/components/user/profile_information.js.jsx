var ProfileInformation = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return { editingBiography: false,
             biography: this.props.user.biography,
             profilePicUrl: this.props.user.profile_pic_url,
             following: ProfileStore.following(),
             editingProfilePic: false };
  },
  componentDidMount: function () {
    ProfileStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function () {
    ProfileStore.removeChangeListener(this._onChange);
  },
  componentWillReceiveProps: function () {
    this.setState({ editingBiography: false, editingProfilePic: false });
  },
  editBiography: function () {
    this.setState({ editingBiography: true });
  },
  updateBiography: function (e) {
    e.preventDefault();

    if (this.state.biography) {
      ApiUtil.updateUser({ biography: this.state.biography });
    }

    this.setState({ editingBiography: false });
  },
  editProfilePic: function () {
    this.setState({ editingProfilePic: !this.state.editingProfilePic, editingBiography: false });
  },
  updateProfilePic: function (media_url) {
    ApiUtil.updateUser({ profile_pic_url: media_url });
    this.setState({ editingProfilePic: false });
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
            (
              this.state.editingProfilePic ?
              <div>
                <UploadWidget mediaUploadedHandler={this.updateProfilePic} />
                <button className="btn btn-default" onClick={this.editProfilePic}>Cancel</button>
              </div> :
              (
                !this.state.editingBiography ?
                <a onClick={this.editBiography}>Edit Bio</a> :
                ""
              )
            ) :
            (
              this.state.following ?
              <button className="btn btn-default" onClick={this.toggleFollow}>Unfollow</button> :
              <button className="btn btn-primary" onClick={this.toggleFollow}>Follow</button>
            )
          }
          <h1>
            {
              this.props.user.id === window.CURRENT_USER_ID ?
              <a onClick={this.editProfilePic}><img className="profile-pic" src={this.props.user.profile_pic_url} /></a> :
              <img className="profile-pic" src={this.props.user.profile_pic_url} />
            }
            <small>{this.props.user.username}</small>
          </h1>
          <div className="profile-information wrapword">
            {
              this.state.editingBiography ?
              <form className="form-group clearfix" onSubmit={this.updateBiography}>
                <textarea className="form-control" valueLink={this.linkState("biography")}
                          defaultValue={this.props.user.biography}></textarea>
                <button type="submit" className="btn btn-primary form-control">Update</button>
              </form> :
              <div>
                <p>{this.props.user.biography}</p>
              </div>
            }
          </div>
          <div className="user-stats">
            <div className="num-posts">
              {
                this.props.user.posts ?
                this.props.user.posts.length :
                ""
              }
              {
                this.props.user.posts && this.props.user.posts.length == 1 ?
                " post" :
                " posts"
              }
            </div>
            <div className="num-followers">
              {
                this.props.user.followers ?
                this.props.user.followers.length :
                ""
              }
              {
                this.props.user.followers && this.props.user.followers.length == 1 ?
                " follower" :
                " followers"
              }
            </div>
            <div className="num-following">
              {
                this.props.user.followees ?
                this.props.user.followees.length :
                ""
              } following
            </div>
          </div>
        </div>
      </div>
    );
  }
});
