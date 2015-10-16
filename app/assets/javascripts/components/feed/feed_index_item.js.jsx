var FeedIndexItem = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {editing: false, caption: this.props.post.caption};
  },
  deletePost: function (postId) {
    if (confirm("Are you sure you want to delete this post?")) {
      ApiUtil.deletePost(postId);
    }
  },
  updatePost: function (e) {
    e.preventDefault();

    ApiUtil.updatePost(this.props.post.id, {caption: this.state.caption});
    this.setState({editing: false});
  },
  renderEditForm: function () {
    this.setState({editing: true});
  },
  navigateToUserProfile: function (userId) {
    window.location.href = "#/users/" + userId;
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
            <img src={post.media_url} />
          </div>
          <div className="caption-section">
            <p className="pull-left"><a onClick={this.navigateToUserProfile.bind(null, post.user_id)}><b>{post.username}</b></a>: </p>
            <span>
              {
                this.state.editing ?
                <form className="form-group clearfix" onSubmit={this.updatePost}>
                  <textarea className="form-control" valueLink={this.linkState("caption")} defaultValue={post.caption}></textarea>
                  <button type="submit" className="btn-sm btn-primary form-control">Update</button>
                </form> :
                <div className="pull-left feed-item-caption">
                  <p className="wrapword">{post.caption}</p>
                </div>
              }
            </span>
          </div>
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
    );
  }
});
