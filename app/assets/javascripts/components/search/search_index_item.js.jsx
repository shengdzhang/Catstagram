var SearchIndexItem = React.createClass({
  handleClick: function () {
    this.props.handleClick();
    if (this.props.result.username) {
      window.location.href = "#/users/" + this.props.result.id;
    } else {
      window.location.href = "#/tags/" + this.props.result.name;
    }
  },
  render: function () {
    return (
      <li>
        {
          this.props.result.username ?
          <a onClick={this.handleClick}>{this.props.result.username}</a> :
          <a onClick={this.handleClick}>{this.props.result.name}</a>
        }
      </li>
    );
  }
});
