var App = React.createClass({
  mixins: [ReactRouter.History],
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
