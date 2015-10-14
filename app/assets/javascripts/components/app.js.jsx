var App = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar />
        { this.props.children }
      </div>
    );
  }
});
