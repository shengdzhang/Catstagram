var MainItem = React.createClass ({

  getInitialState: function () {
    return {user:  this.props.user, media_url: []};
  },

  componentDidMount: function () {
    UserStore.addChangeListener(this._onChange);
    ApiUtil.fetchMain(this.props.user.id);
  },

  _onChange: function (e) {
    var user = UserStore.getUser(this.props.user.id);
    media = user.media;
    if (media) {
      this.setState({user: user, media_url: media});
    } else {
      ApiUtil.fetchMain(this.props.user.id);
    }
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this._onChange);
  },

  handleClick: function () {
      window.location.href = "#/users/" + this.props.user.id;
  },

  toggleFollow: function () {
    ApiUtil.toggleMainFollow(this.state.user.id, this.state.user.following);
  },

  render: function () {

      return (
        <li className="list-group-item group">
          <img className="pull-left main-pic" src={this.state.user.profile_pic_url}/>
          <div className="main-name-wrapper">
            <a className="main-name" onClick={this.handleClick}>{this.state.user.displayname}</a>
          </div>
          {
            this.state.user.following ?
            <button className="unfollow main-follow-btn btn btn-default pull-right" onClick={this.toggleFollow}>Unfollow</button> :
            <button className="follow main-follow-btn btn btn-primary pull-right" onClick={this.toggleFollow}>Follow</button>
          }

          {

            this.state.media_url.map(function (media, idx){
              return <a href={"#/media/" + media.id}  key={idx}><img className="main-img" src={media.media_url}/></a>
            }.bind(this))
          }
        </li>
      );

  }
})
