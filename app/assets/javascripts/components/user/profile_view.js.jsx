var ProfileView = React.createClass({
  getInitialState: function () {
    return { user: ProfileStore.user() };
  },
  componentDidMount: function () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    ProfileStore.addChangeListener(this._onChange);
    ApiUtil.fetchUser(this.props.params.id);
  },
  componentWillUnmount: function () {
    ProfileStore.removeChangeListener(this._onChange);
  },
  componentWillReceiveProps: function (props) {
    this.setState({ user: {} });
    ApiUtil.fetchUser(props.params.id);
  },
  _onChange: function () {
    this.setState({ user: ProfileStore.user() });
  },
  render: function () {
    return (
      <div>
        <ProfileInformation user={this.state.user} />
        <div className="profile-items">
          {
            (typeof this.state.user.posts !== "undefined" && this.state.user.posts.length > 0) ?
            this.state.user.posts.map(function (post) {
              return <ProfileViewItem post={post} key={post.id} />;
            }) :
              this.state.user.id === window.CURRENT_USER_ID ?
              <h4>You don't have any posts! How unfortunate!</h4> :
              <h4>This user doesn't have any posts! How unfortunate!</h4>
          }
        </div>
      </div>
    );
  }
});
