var FeedIndex = React.createClass({
  getInitialState: function () {
    return { posts: PostStore.all() };
  },
  componentDidMount: function () {
    PostStore.addChangeListener(this._onChange);
    ApiUtil.fetchAllPostsFromUser(window.CURRENT_USER_ID);
  },
  componentWillUnmount: function () {
    PostStore.removeChangeListener(this._onChange);
  },
  _onChange: function () {
    this.setState({ posts: PostStore.all() });
  },
  render: function () {
    return (
      <div className="feed-index">
        <div className="feed-items">
          {
            this.state.posts.map(function (post) {
              return <FeedIndexItem post={post} key={post.id} />;
            })
          }
        </div>
      </div>
    );
  }
});
