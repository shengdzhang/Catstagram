var SearchIndexItem = React.createClass({
  navigateToUserProfile: function (userId) {
    window.location.href = "#/users/" + userId;
  },
  render: function () {
    return (
      <li>
        <a onClick={this.navigateToUserProfile.bind(null, this.props.result.id)}>{this.props.result.username}</a>
      </li>
    );
  }
});
