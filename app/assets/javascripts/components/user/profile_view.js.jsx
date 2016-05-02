var ProfileView = React.createClass({

  getInitialState: function () {
    return { user: ProfileStore.user() };
  },

  componentDidMount: function () {
    ProfileStore.addChangeListener(this._onChange);
    ApiUtil.fetchUser(this.props.params.id);
  },

  componentWillUnmount: function () {
    ProfileStore.removeChangeListener(this._onChange);
  },

  componentWillReceiveProps: function (props) {
    this.setState({ user: {} });
    ApiUtil.fetchUser(props.params.id);
  },

  _onChange: function () {
    this.setState({ user: ProfileStore.user() });
  },

  render: function () {
    return (
      <div id="show-wrapper">
        <ProfileInformation user={this.state.user} />

        <ul className="media-list">
          {
            (typeof this.state.user.media !== "undefined" && this.state.user.media.length > 0) ?
              this.state.user.media.map(function (medium) {
                return <MediaItem medium={medium} key={medium.id} />;
              }) :
            this.state.user.id === window.CURRENT_USER_ID ?
              <h4 className="col-xs-offset-3 profile-no-media">No media to show. Upload some media!</h4> :
              <h4 className="col-xs-offset-2 profile-no-media">This user currently has no media.</h4>
          }
        </ul>
      </div>
    );
  }
});
