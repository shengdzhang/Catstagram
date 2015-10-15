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
  render: function () {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading clearfix">
          <span className="pull-left">{this.props.post.username}</span>
          <span className="pull-right">{jQuery.timeago(this.props.post.created_at)}</span>
        </div>
        <div className="panel-body">
          <div className="panel-media">
            <img className="clearfix" src={this.props.post.media_url} />
          </div>
          <div className="comment-section">
            <p className="pull-left"><b>{this.props.post.username}</b>: </p>
            <span>
              {
                this.state.editing ?
                <form className="form-group clearfix" onSubmit={this.updatePost}>
                  <textarea className="form-control" valueLink={this.linkState("caption")} defaultValue={this.props.post.caption}></textarea>
                  <button type="submit" className="btn-sm btn-primary form-control">Update</button>
                </form> :
                <div className="pull-left feed-item-caption" width="80%">
                  {this.props.post.caption}
                </div>
              }
            </span>
          </div>
          {
            this.props.post.user_id === window.CURRENT_USER_ID ?
            <div className="post-controls pull-right">
              <a onClick={this.deletePost.bind(null, this.props.post.id)}>
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
