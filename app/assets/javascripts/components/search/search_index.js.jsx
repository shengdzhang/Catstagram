var SearchIndex = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return { results: [], users: true, tags: false, query: "" };
  },
  componentDidMount: function () {
    SearchStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function () {
    SearchStore.removeChangeListener(this._onChange);
  },
  changeToUsersSearch: function (e) {
    e.preventDefault();
    this.setState({ users: true, tags: false });
    ApiUtil.fetchUserSearchResults(this.state.query);
    $('.search input:text').focus();
  },
  changeToTagsSearch: function (e) {
    e.preventDefault();
    this.setState({ users: false, tags: true });
    ApiUtil.fetchTagSearchResults(this.state.query);
    $('.search input:text').focus();
  },
  updateResults: function (e) {
    if (this.state.users) {
      ApiUtil.fetchUserSearchResults(this.state.query);
    } else {
      ApiUtil.fetchTagSearchResults(this.state.query);
    }
  },
  handleClick: function () {
    this.setState({ query: "" });
    $('.search input:text').val("");
    ApiUtil.fetchUserSearchResults("");
  },
  _onChange: function () {
    this.setState({ results: SearchStore.all() });
  },
  render: function () {
    return (
      <div className="input-group">
        <div className="input-group-btn">
          <button className="btn btn-default" onClick={this.changeToUsersSearch}>Users</button>
        </div>
        <div className="input-group-btn">
          <button className="btn btn-default" onClick={this.changeToTagsSearch}>Tags</button>
        </div>
        <div className="input-group search">
          <input className="form-control" type="text" placeholder={this.state.users ? "Search Users" : "Search Tags"}
                 onKeyUp={this.updateResults} valueLink={this.linkState("query")} />
        {
          this.state.results.length > 0 ?
          <ul className="results dropdown-menu">
            {
              this.state.results.map(function (result, index) {
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
