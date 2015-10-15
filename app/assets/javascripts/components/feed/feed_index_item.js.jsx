var FeedIndexItem = React.createClass({
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
          <p><b>{this.props.post.username}</b>: {this.props.post.caption}</p>
        </div>
      </div>
    );
  }
});
