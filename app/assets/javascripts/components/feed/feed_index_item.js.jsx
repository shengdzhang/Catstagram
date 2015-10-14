var FeedIndexItem = React.createClass({
  render: function () {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading clearfix">
          <span className="pull-right">{jQuery.timeago(this.props.post.created_at)}</span>
        </div>
        <div className="panel-body">
          <img src={this.props.post.media_url} width="372.656px" />
          <br /><br />
          <p>{this.props.post.username}: {this.props.post.caption}</p>
        </div>
      </div>
    );
  }
});
