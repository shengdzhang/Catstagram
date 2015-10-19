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
    ApiUtil.toggleFavorite(this.props.post.id, this.props.post.favorited);
  },
  updatePost: function (caption) {
    ApiUtil.updatePost(this.props.post.id, {caption: caption});
  },
  postComment: function (comment) {
    ApiUtil.createComment(this.state.post.id, { body: comment }, function (receivedComment) {
      $('.comments-modal').prepend('<div class="comment wrapword" id="comment' + receivedComment.id + '"><a class="glyphicon glyphicon-trash delete-comment pull-left" data-id="' + receivedComment.id + '"></a><a href="#/users/' + receivedComment.user_id + '">' + receivedComment.posted_by + '</a>:<br/><p>' + receivedComment.body + '</p><br/></div>');
    });
  },
  renderEditForm: function () {
    BootstrapDialog.show({
      title: 'Update Caption',
      message: '<textarea class="form-control">' + this.props.post.caption + '</textarea>',
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
  navigateToUserProfile: function (userId) {
    window.location.href = "#/users/" + userId;
  },
  showCaption: function (caption) {
    var modal = new BootstrapDialog({
      title: 'Caption',
      message: '<img class="modal-image" src="' + this.state.post.media_url + '"/><br/>' + (caption || "There is no caption for this post.")
    });
    modal.realize();
    modal.getModalHeader().hide();
    modal.open();
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
          dialogRef.getModalBody().find('textarea').val('');
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
          <a className="pull-left" onClick={this.navigateToUserProfile.bind(null, post.user_id)}>{post.username}</a>
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
                <div className="favorites pull-left">
                  <a className="pull-left" onClick={this.showLikers}>{post.likers.length}</a>
                  <a onClick={this.toggleFavorite}>
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
