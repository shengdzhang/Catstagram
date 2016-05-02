var MainIndex = React.createClass({

  getInitialState: function () {
    return {users:  UserStore.shuffle().splice(0,8), set:false};
  },

  componentDidMount: function () {
    UserStore.addChangeListener(this._onChange);
  },

  _onChange: function (e) {
    if (!this.state.set) {
      this.setState({users: UserStore.shuffle().splice(0,8), set:true});
    }
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var self = this;
    return (
      <div className="user-index">
        <h3 className="text-center main-msg"> Welcome! Check out some sample users!</h3>
        <div>
          <ul className="list-group">
            {
              this.state.users.map(function (user, idx){
                return <MainItem key={idx} user={user}/>
              }.bind(this))
            }
          </ul>
        </div>
      </div>
    );
  }
});
