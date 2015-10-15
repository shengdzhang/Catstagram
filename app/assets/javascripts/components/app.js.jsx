var App = React.createClass({
  render: function () {
    return (
      <div>
        <div id="navbar-feed-separator" />
        <Navbar />
        { this.props.children }
      </div>
    );
  }
});
