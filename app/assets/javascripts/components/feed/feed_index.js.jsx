var FeedIndex = React.createClass({
  getInitialState: function () {
    return { posts: PostStore.all() };
  },
  componentDidMount: function () {
    PostStore.addChangeListener(this._onChange);
    ApiUtil.fetchFeed();
  },
  componentWillUnmount: function () {
    PostStore.removeChangeListener(this._onChange);
  },
  _onChange: function () {
    this.setState({ posts: PostStore.all() });
  },
  render: function () {
    var buttons = [
        {type: 'danger',  text: 'Hide Modal',  handler: this.handleExternalHide},
        {type: 'primary', text: 'Do Nothing', handler: this.handleDoingNothing}
    ];
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
