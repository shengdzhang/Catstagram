var FeedIndexItem = React.createClass({
  render: function () {
    return (
      <li><img src={this.props.post.media_url} /></li>
    );
  }
});
