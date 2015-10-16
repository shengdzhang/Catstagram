var ProfileViewItem = React.createClass({
  openPostView: function () {
    debugger;
  },
  render: function () {
    return (
      <div className="profile-view-item pull-left box-shadow--16dp">
        <a onClick={this.openPostView}><img src={this.props.post.media_url} /></a>
      </div>
    );
  }
});
