var FeedIndex = React.createClass({
  getInitialState: function () {
    return { posts: PostStore.all() };
  },
  componentDidMount: function () {
    PostStore.addChangeListener(this._onChange);
    ApiUtil.fetchFeed();
    this.interval = setInterval(ApiUtil.fetchFeed, 30000);
  },
  componentWillUnmount: function () {
    PostStore.removeChangeListener(this._onChange);
    clearInterval(this.interval);
  },
  _onChange: function () {
    this.setState({ posts: PostStore.all() });
  },
  render: function () {
    return (
      <div className="feed-index">
        <div className="feed-items">
          {
            this.state.posts.length > 0 ?
            this.state.posts.map(function (post) {
              return <FeedIndexItem post={post} key={post.id} />;
            }) :
            <h4>There are no posts in your feed! Go follow a friend.</h4>
          }
        </div>
      </div>
    );
  }
});
