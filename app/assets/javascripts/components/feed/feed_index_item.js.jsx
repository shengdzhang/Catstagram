var FeedIndexItem = React.createClass({
  deletePost: function (postId) {
    BootstrapDialog.confirm({
      title: 'WARNING',
      message: 'Are you sure you want to delete this post? This action is irreversible.',
      type: BootstrapDialog.TYPE_WARNING,
      btnCancelLabel: 'Cancel',
      btnOKLabel: 'Delete',
      btnOKClass: 'btn-warning',
      callback: function(result) {
        if(result) {
          ApiUtil.deletePost(postId);
        }
      }
    });
  },
  updatePost: function (caption) {
    ApiUtil.updatePost(this.props.post.id, {caption: caption});
  },
  renderEditForm: function () {
    BootstrapDialog.show({
      title: 'Update Caption',
      message: '<textarea class="form-control">' + this.props.post.caption + '</textarea>',
      buttons: [{
        label: 'Update',
        cssClass: 'btn-primary',
        action: function(dialogRef) {
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
  renderModal: function (caption) {
    BootstrapDialog.show({
      title: 'Caption',
      message: caption || "There is no caption for this post.",
    });
  },
  render: function () {
    var post = this.props.post;

    return (
      <div className="panel panel-primary effect8">
        <div className="panel-heading clearfix">
          <a className="pull-left" onClick={this.navigateToUserProfile.bind(null, post.user_id)}>{post.username}</a>
          <span className="pull-right">{jQuery.timeago(post.created_at)}</span>
        </div>
        <div className="panel-body">
          <div className="panel-media">
            <a onClick={this.renderModal.bind(null, post.caption)}>
              <img src={post.media_url} />
            </a>
          </div>
          <div className="panel-footer">
            <span>
              <div className="post-interactions pull-left">
                <div className="favorites pull-left">
                  <span className="pull-left">0</span>
                  <a>
                    <span className="glyphicon glyphicon-heart-empty pull-left"></span>
                  </a>
                </div>
                <div className="comments pull-left">
                  <span className="pull-left">0</span>
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
