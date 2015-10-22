var SearchIndex = React.createClass({
  getInitialState: function () {
    return { users: [], tags: [] };
  },
  componentDidMount: function () {
    SearchStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function () {
    SearchStore.removeChangeListener(this._onChange);
  },
  updateResults: function (e) {
    ApiUtil.fetchUserSearchResults(e.target.value);
    ApiUtil.fetchTagSearchResults(e.target.value);
  },
  handleClick: function () {
    $('.search input:text').val("");
    ApiUtil.fetchUserSearchResults("");
    ApiUtil.fetchTagSearchResults("");
  },
  _onChange: function () {
    this.setState({ users: SearchStore.users(), tags: SearchStore.tags()  });
  },
  render: function () {
    var usersPresent = (this.state.users.length > 0);
    var tagsPresent = (this.state.tags.length > 0);

    return (
      <div className="form-group">
        <div className="form-group search">
          <input className="form-control" type="text" placeholder="Search"
                 onKeyUp={this.updateResults} />
        {
          usersPresent || tagsPresent ?
          <ul className="results dropdown-menu">
            {
              usersPresent ?
              <li><b>Users</b></li> :
              ""
            }
            {
              this.state.users.map(function (result, index) {
                return <SearchIndexItem handleClick={this.handleClick} result={result} key={index} />
              }.bind(this))
            }
            {
              tagsPresent ?
              <li><b>Tags</b></li> :
              ""
            }
            {
              this.state.tags.map(function (result, index) {
                return <SearchIndexItem handleClick={this.handleClick} result={result} key={index} />
              }.bind(this))
            }
          </ul> :
          ""
        }
        </div>
      </div>
    );
  }
});
