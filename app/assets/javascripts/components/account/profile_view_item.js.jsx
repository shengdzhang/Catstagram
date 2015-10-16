var ProfileViewItem = React.createClass({
  openPostView: function () {
    debugger;
  },
  render: function () {
    return (
      <div className="profile-view-item pull-left effect8">
        <a onClick={this.openPostView}><img src={this.props.post.media_url} /></a>
      </div>
    );
  }
});
