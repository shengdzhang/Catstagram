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
  deletePost: function (postId) {
    BootstrapDialog.confirm({
      title: 'WARNING',
      message: 'Are you sure you want to delete this post? This action is irreversible.',
      type: BootstrapDialog.TYPE_WARNING,
      btnCancelLabel: 'Cancel',
      btnOKLabel: 'Delete',
      btnOKClass: 'btn-warning',
      callback: function(result) {
        if (result) {
          ApiUtil.deletePost(postId);
        }
      }
    });
  },
  renderEditForm: function () {
    BootstrapDialog.show({
      title: 'Update Caption',
      message: '<textarea class="form-control">' + this.state.post.caption + '</textarea>',
      buttons: [{
        label: 'Update',
        cssClass: 'btn-primary',
        action: function (dialogRef) {
          var caption = dialogRef.getModalBody().find('textarea').val();
          this.updatePost(caption);
          dialogRef.close();
        }.bind(this)
      }]
    });
  },
  updatePost: function (caption) {
    ApiUtil.updatePost(this.state.post.id, {caption: caption});
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
          <div className="post-detail-symbols clearfix">
            <div className="post-detail-favorites">
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
            {
              this.state.post.user_id === window.CURRENT_USER_ID ?
              <div className="post-controls pull-right">
                <a onClick={this.deletePost.bind(null, this.state.post.id)}>
                  <span className="glyphicon glyphicon-trash pull-right"></span>
                </a>
                <a onClick={this.renderEditForm}>
                  <span className="glyphicon glyphicon-edit pull-right"></span>
                </a>
              </div> : ""
            }
          </div>
          <div className="post-detail-caption wrapword">
            <a href={"#/users/" + this.state.post.user_id}>{this.state.post.username}</a>:
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
