var ProfileView = React.createClass({
  getInitialState: function () {
    return { posts: ProfileStore.posts(), user: ProfileStore.user() };
  },
  componentDidMount: function () {
    ProfileStore.addChangeListener(this._onChange);
    ApiUtil.fetchUser(this.props.params.id);
    ApiUtil.fetchAllPostsFromUser(this.props.params.id);
  },
  componentWillUnmount: function () {
    ProfileStore.removeChangeListener(this._onChange);
  },
  componentWillReceiveProps: function (props) {
    ApiUtil.fetchUser(props.params.id);
    ApiUtil.fetchAllPostsFromUser(props.params.id);
  },
  _onChange: function () {
    this.setState({ posts: ProfileStore.posts(), user: ProfileStore.user() });
  },
  render: function () {
    return (
      <div>
        <ProfileInformation user={this.state.user} />
        <div className="profile-items">
          {
            this.state.posts.map(function (post) {
              return <ProfileViewItem post={post} key={post.id} />;
            })
          }
        </div>
      </div>
    );
  }
});
