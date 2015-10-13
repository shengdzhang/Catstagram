var App = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar />

        <div className="pixor-root">

        </div>

        { this.props.children }
      </div>
    );
  }
});
