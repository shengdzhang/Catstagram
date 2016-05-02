var Search = React.createClass ({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {searchQuery: "", users: UserStore.all()};
  },

  handleChange: function (e) {
    this.setState ({searchQuery: e.target.value});
  },

  componentDidMount: function () {
    UserStore.addChangeListener(this.onUserChange);
  },

  componentWillUnmount: function () {
    UserStore.removeChangeListener(this.onUserChange);
  },

  onUserChange: function () {
    this.setState({users: UserStore.all()});
  },

  handleClick: function (id, e) {
    this.setState({searchQuery: ""});
    var url = "users/" + id;
    debugger;
    this.history.pushState(null, url);
  },

  render: function () {
    var placeholder = "\ud83d\udd0d";
    var names = [];
    var search = this.state.searchQuery.trim().toLowerCase();
    var self = this;
    if (search.length > 0){
      for(var i = 0; i < this.state.users.length; i++)
      {
        if (this.state.users[i].displayname.toLowerCase().slice(0,search.length).match(search)) {
          names.push(this.state.users[i]);
        }
      }
    }
    return (
      <div id="searchbar" className="group">
        <div id="searchglass">{placeholder}</div><input onChange={this.handleChange} name="search" type="text" value={this.state.searchQuery} placeholder=" Search"/>
        <ul className="list-group my-dropdown">
          {
              names.map(function(user, idx){
              return <a href={"#users/" + user.id} key={idx}>
                <li className="search-item list-group-item group">
                  <img className="search-pic" src={user.profile_pic_url}/>
                  <div className="search-name">
                    {user.displayname}
                  </div>
                </li>
              </a>
            })
          }
        </ul>
      </div>
    );
  }

});
