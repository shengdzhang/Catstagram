var ProfileInformation = React.createClass({

  getInitialState: function () {
    return { description: this.props.user.description,
             profilePicUrl: this.props.user.profile_pic_url,
             following: ProfileStore.following(),
           };
  },

  componentDidMount: function () {
    ProfileStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ProfileStore.removeChangeListener(this._onChange);
  },

  componentWillReceiveProps: function () {
    BootstrapDialog.closeAll();
    this.setState({ editingDescription: false, editingProfilePic: false });
  },

  toggleFollow: function () {
    ApiUtil.toggleFollow(this.props.user.id, this.state.following);
  },

  showFollowers: function () {
    var followers =
      this.props.user.followers.map(function (follower) {
        return '<a href="#/users/' + follower.id + '">' + follower.displayname + '</a>';
      }).join('<br/>');

    BootstrapDialog.show({
      title: "Followers",
      message: followers
    });
  },

  showFollowing: function () {
    var followees =
      this.props.user.followees.map(function (followee) {
        return '<a className="show-following" href="#/users/' + followee.id + '">' + followee.displayname + '</a>';
      }).join('<br/>');

    BootstrapDialog.show({
      title: "Following",
      message: followees
    });
  },

  _onChange: function () {
    this.setState({ following: ProfileStore.following() });
  },

  render: function () {
    
    return (
      <div>

        <div className="page-header">

          <div className="profile group">

            <div className="profile-image col-xs-offset-2 group">

              <img className="profile-picture" src={this.props.user.profile_pic_url} />
              <h2 className="profile-user-name">{this.props.user.displayname}</h2>
                {
                  this.props.user.id === window.CURRENT_USER_ID ?
                  (
                    <div></div>
                  ) :

                  (
                    this.state.following ?
                    <button className="unfollow profile-follow-btn btn btn-default pull-right" onClick={this.toggleFollow}>Unfollow</button> :
                    <button className="follow profile-follow-btn btn btn-primary pull-right" onClick={this.toggleFollow}>Follow</button>
                  )
                }
            </div>

            <h3>{this.props.user.description}</h3>

          </div>


          <div className="profile-stats">

              <div className="col-xs-offset-1 col-xs-3">
                <h4>
                  {
                    "Media: "
                  }
                  {
                    this.props.user.media ?
                    this.props.user.media.length :
                    ""
                  }
                </h4>
              </div>

              <a className="col-xs-3" onClick={this.showFollowers}>
                <h4>
                  {
                    this.props.user.followers && this.props.user.followers.length == 1 ?
                    "Follower: " :
                    "Followers: "
                  }
                  {
                    this.props.user.followers ?
                    this.props.user.followers.length :
                    ""
                  }
                </h4>
              </a>

              <a className="col-xs-3" onClick={this.showFollowing}>
                <h4>
                  {
                    this.props.user.followees && this.props.user.followees.length == 1 ?
                    "Following: " :
                    "Followings: "
                  }
                  {
                    this.props.user.followees ?
                    this.props.user.followees.length :
                    ""
                  }
                </h4>
              </a>
          </div>

        </div>
      </div>
    );
  }
});
