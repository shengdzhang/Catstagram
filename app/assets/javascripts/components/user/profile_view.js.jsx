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
            this.state.user.posts ?
            this.state.user.posts.map(function (post) {
              return <ProfileViewItem post={post} key={post.id} />;
            }) :
            ""
          }
        </div>
      </div>
    );
  }
});
