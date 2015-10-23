var FeedIndex = React.createClass({
  getInitialState: function () {
    return { posts: PostStore.all(), page: 1 };
  },
  componentDidMount: function () {
    PostStore.addChangeListener(this._onChange);
    ApiUtil.fetchFeed(this.state.page);
    $(window).on('scroll', function() {
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
        this.state.page += 1;
        ApiUtil.fetchFeed(this.state.page);
      }
    }.bind(this));
  },
  componentWillUnmount: function () {
    PostStore.removeChangeListener(this._onChange);
    clearInterval(this.interval);
    $(window).off('scroll');
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
