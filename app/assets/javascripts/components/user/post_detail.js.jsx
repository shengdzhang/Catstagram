var PostDetail = React.createClass({
  getInitialState: function () {
    return { post: PostStore.detailedPost() };
  },
  componentDidMount: function () {
    PostStore.addChangeListener(this._onChange);
    ApiUtil.fetchSinglePost(this.props.params.id);
    this.interval = setInterval(ApiUtil.fetchSinglePost.bind(null, this.props.params.id), 5000);
  },
  componentWillUnmount: function () {
    PostStore.removeChangeListener(this._onChange);
    clearInterval(this.interval);
  },
  componentWillReceiveProps: function (props) {
    ApiUtil.fetchSinglePost(props.params.id);
  },
  toggleFavorite: function () {
    ApiUtil.toggleFavorite(this.state.post.id, this.state.post.favorited, function (status) {
      if (status.favorited && this.state.post.user_id !== window.CURRENT_USER_ID) {
        ApiUtil.createNotification({ user_id: this.state.post.user_id,
                                     message: window.CURRENT_USER_USERNAME + " liked your photo.",
                                     href: "#/posts/" + this.state.post.id });
      }
    }.bind(this));
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
          var userId = this.state.post.user_id;
          ApiUtil.deletePost(postId, function () {
            window.location.href = "#/users/" + userId;
          });
        }
      }.bind(this)
    });
  },
  renderEditForm: function () {
    BootstrapDialog.show({
      title: 'Update Caption',
      message: '<textarea class="form-control" placeholder="Add a caption...">' + this.state.post.caption + '</textarea>',
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
  handleKeyUp: function (e) {
    if (e.keyCode === 13) {
      this.postComment(e.target.value);
    }
  },
  postComment: function (comment) {
    ApiUtil.createComment(this.state.post.id, { body: comment }, function () {
      $('input:text').val('');
      if (this.state.post.user_id !== window.CURRENT_USER_ID) {
        ApiUtil.createNotification({ user_id: this.state.post.user_id,
                                     message: window.CURRENT_USER_USERNAME + " commented on your photo.",
                                     href: "#/posts/" + this.state.post.id });
      }
    }.bind(this));
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
    var likers = this.state.post.likers;

    return (
      <div className="panel panel-primary post-detail">
        <div className="panel-heading clearfix">
          <a href={'#/users/' + this.state.post.user_id} className="pull-left">{this.state.post.username}</a>
          <span className="pull-right">{this.state.post.created_at ? jQuery.timeago(this.state.post.created_at) : ""}</span>
        </div>
        <div className="panel-body">
          <div className="post-detail-photo">
            <img src={this.state.post.media_url} />
          </div>
          <div className="post-detail-symbols clearfix">
            <div className="post-detail-favorites" onClick={this.showLikers}>
              <a className="pull-left">
                {
                  likers ?
                  likers.length + (likers.length != 1 ? " likes" : " like") :
                  "0 likes"
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
          <br/>
          <div className="post-detail-caption wrapword">
            {
              this.state.post.caption ?
              <div>
                <a href={"#/users/" + this.state.post.user_id}>{this.state.post.username}</a>:
                <p>{this.state.post.caption}</p>
              </div> :
              ""
            }
          </div>
          <br/>
          <div className="post-detail-comments-section clearfix">
            {
              this.state.post.comments ?
              this.state.post.comments.map(function (comment) {
                return <PostDetailComment comment={comment} postedById={this.state.post.user_id} key={comment.id} />
              }.bind(this)) :
              ""
            }

            <div className="input-group input-group">
              <a className="input-group-addon" onClick={this.toggleFavorite}>
                {
                  this.state.post.favorited ?
                  <span className="glyphicon glyphicon-heart pull-left"></span> :
                  <span className="glyphicon glyphicon-heart-empty pull-left"></span>
                }
              </a>
              <input type="text" className="form-control" placeholder="Add a comment..." onKeyUp={this.handleKeyUp}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
