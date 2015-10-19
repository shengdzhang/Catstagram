var SearchIndexItem = React.createClass({
  render: function () {
    return (
      <li>
        <a href={"#/users/" + this.props.result.id}>{this.props.result.username}</a>
      </li>
    );
  }
});
