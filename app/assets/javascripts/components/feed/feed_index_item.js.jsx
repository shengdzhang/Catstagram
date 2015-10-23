var FeedIndexItem = React.createClass({
  getInitialState: function () {
    return { post: this.props.post };
  },
  componentWillReceiveProps: function (props) {
    this.setState({ post: props.post });
  },
  componentWillUnmount: function () {
    $('.comments-modal').off();
    BootstrapDialog.closeAll();
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
  toggleFavorite: function () {
    ApiUtil.toggleFavorite(this.props.post.id, this.props.post.favorited, function (status) {
      if (status.favorited && this.state.post.user_id !== window.CURRENT_USER_ID) {
        ApiUtil.createNotification({ user_id: this.state.post.user_id,
                                     message: window.CURRENT_USER_USERNAME + " liked your photo.",
                                     href: "#/posts/" + this.state.post.id });
      }
    }.bind(this));
  },
  updatePost: function (caption) {
    ApiUtil.updatePost(this.props.post.id, {caption: caption});
  },
  postComment: function (comment) {
    ApiUtil.createComment(this.state.post.id, { body: comment }, function () {
      if (this.state.post.user_id !== window.CURRENT_USER_ID) {
        ApiUtil.createNotification({ user_id: this.state.post.user_id,
                                     message: window.CURRENT_USER_USERNAME + " commented on your photo.",
                                     href: "#/posts/" + this.state.post.id });
      }
    }.bind(this));
  },
  renderEditForm: function () {
    BootstrapDialog.show({
      title: 'Update Caption',
      message: '<textarea class="form-control" placeholder="Add a caption...">' + this.props.post.caption + '</textarea>',
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
  showCaption: function (caption) {
    var modal = new BootstrapDialog({
      title: 'Caption',
      message: '<img class="modal-image" src="' + this.state.post.media_url + '"/><br/><p>' + caption + '</p><a href="#/posts/' + this.state.post.id + '">View Full Post</a>'
    });
    modal.realize();
    modal.getModalHeader().hide();
    modal.open();
  },
  showComments: function () {
    var comments =
      this.state.post.comments.map(function (comment) {
        return '<div class="comment wrapword" id="comment' + comment.id + '">' + (comment.user_id === window.CURRENT_USER_ID || this.state.post.user_id === window.CURRENT_USER_ID ? '<a class="glyphicon glyphicon-trash delete-comment pull-left" data-id="' + comment.id + '"></a>' : '') + '<a href="#/users/' + comment.user_id + '">' + comment.posted_by + '</a>:<br/><p>' + comment.body + '</p><br/></div>';
      }.bind(this)).join('');

    BootstrapDialog.show({
      title: 'Comments',
      message: '<div class="comments-modal">' + comments + '</div><br/><textarea class="form-control" placeholder="Add a comment..." />',
      buttons: [{
        label: 'Submit',
        cssClass: 'btn-primary',
        action: function (dialogRef) {
          var comment = dialogRef.getModalBody().find('textarea').val();
          this.postComment(comment);
          dialogRef.close();
        }.bind(this)
      }],
      onshown: function () {
        $('.comments-modal').on('click', '.delete-comment', function (e) {
          ApiUtil.deleteComment(this.state.post.id, e.target.dataset.id, function () {
            $('#comment' + e.target.dataset.id).remove();
          }.bind(this));
        }.bind(this));
      }.bind(this)
    });
  },
  render: function () {
    var post = this.state.post;

    return (
      <div className="panel panel-primary feed-index-item effect8">
        <div className="panel-heading clearfix">
          <a href={"#/users/" + post.user_id} className="pull-left">{post.username}</a>
          <a href={"#/posts/" + post.id} className="pull-right">{jQuery.timeago(post.created_at)}</a>
        </div>
        <div className="panel-body">
          <div className="panel-media">
            <a onClick={this.showCaption.bind(null, post.caption)}>
              <img src={post.media_url} />
            </a>
          </div>
          <div className="panel-footer">
            <span>
              <div className="post-interactions pull-left">
                <div className="favorites pull-left" onClick={this.toggleFavorite}>
                  <a className="pull-left">{post.likers.length}</a>
                  <a>
                    {
                      post.favorited ?
                      <span className="glyphicon glyphicon-heart pull-left"></span> :
                      <span className="glyphicon glyphicon-heart-empty pull-left"></span>
                    }
                  </a>
                </div>
                <div className="comments pull-left" onClick={this.showComments}>
                  <a className="pull-left">{post.comments.length}</a>
                  <a>
                    <span className="glyphicon glyphicon-comment pull-left"></span>
                  </a>
                </div>
              </div>
            </span>
            {
              post.user_id === window.CURRENT_USER_ID ?
              <div className="post-controls pull-right">
                <a onClick={this.deletePost.bind(null, post.id)}>
                  <span className="glyphicon glyphicon-trash pull-right"></span>
                </a>
                <a onClick={this.renderEditForm}>
                  <span className="glyphicon glyphicon-edit pull-right"></span>
                </a>
              </div> : ""
            }
          </div>
        </div>
      </div>
    );
  }
});
