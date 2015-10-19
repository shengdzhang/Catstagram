var PostDetail = React.createClass({
  getInitialState: function () {
    return { post: PostStore.detailedPost() };
  },
  componentDidMount: function () {
    PostStore.addChangeListener(this._onChange);
    ApiUtil.fetchSinglePost(this.props.params.id);
  },
  componentWillUnmount: function () {
    PostStore.removeChangeListener(this._onChange);
  },
  toggleFavorite: function () {
    ApiUtil.toggleFavorite(this.state.post.id, this.state.post.favorited);
  },
  postComment: function (e) {
    e.preventDefault();

    ApiUtil.createComment(this.state.post.id, { body: e.target[0].value }, function () {
      $('textarea').val('');
    });
  },
  showLikers: function () {
    var listOfUsers =
      this.state.post.likers.map(function (user) {
        return '<a href="#/users/' + user.id + '">' + user.username + '</a>';
      }).join('<br/>');

    BootstrapDialog.show({
      title: 'Favorited By:',
      message: listOfUsers,
    });
  },
  _onChange: function () {
    this.setState({ post: PostStore.detailedPost() });
  },
  render: function () {
    return (
      <div className="panel panel-primary post-detail">
        <div className="panel-body">
          <div className="post-detail-photo">
            <img src={this.state.post.media_url} />
          </div>
          <div className="post-detail-favorites clearfix">
            <a className="pull-left" onClick={this.showLikers}>
              {
                this.state.post.likers ?
                this.state.post.likers.length :
                "0"
              }
            </a>
            <a onClick={this.toggleFavorite}>
              {
                this.state.post.favorited ?
                <span className="glyphicon glyphicon-heart pull-left"></span> :
                <span className="glyphicon glyphicon-heart-empty pull-left"></span>
              }
            </a>
          </div>
          <div className="post-detail-caption">
            <a href={"#/users/" + this.state.post.user_id}>{this.state.post.username}:</a>
            <p>{this.state.post.caption || "There is no caption for this post."}</p>
          </div>
          <br/>
          <div className="post-detail-comments-section">
            {
              this.state.post.comments ?
              this.state.post.comments.map(function (comment) {
                return <PostDetailComment comment={comment} key={comment.id} />
              }) :
              ""
            }
            <form className="post-detail-comment-form" onSubmit={this.postComment}>
              <textarea className="form-control" placeholder="Add a comment..." />
              <button type="submit" className="btn btn-primary form-control">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});
