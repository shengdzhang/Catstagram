var ProfileInformation = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return { editing: false, biography: this.props.user.biography };
  },
  editProfile: function () {
    this.setState({ editing: true });
  },
  updateProfile: function () {
    ApiUtil.updateUser({ biography: this.state.biography });
    this.setState({ editing: false });
  },
  render: function () {
    return (
      <div>
        <div className="page-header">
          <h1>{this.props.user.username}</h1>
          {
            this.state.editing ?
            <form className="form-group clearfix" onSubmit={this.updateProfile}>
              <textarea className="form-control" valueLink={this.linkState("biography")}
                        defaultValue={this.props.user.biography}></textarea>
              <button type="submit" className="btn btn-primary form-control">Update</button>
            </form> :
            <div>
              <p>{this.props.user.biography}</p>
              <a onClick={this.editProfile}>Edit profile</a>
            </div>
          }
        </div>
      </div>
    );
  }
});
