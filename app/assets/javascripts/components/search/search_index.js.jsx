var SearchIndex = React.createClass({
  getInitialState: function () {
    return { results: SearchStore.all() };
  },
  componentDidMount: function () {
    SearchStore.addChangeListener(this._onChange);
    $('.search').on('click', 'a', function () {
      $('input:text').val("");
      ApiUtil.fetchUserSearchResults("");
    });
  },
  updateResults: function (e) {
    ApiUtil.fetchUserSearchResults(e.target.value);
  },
  _onChange: function () {
    this.setState({ results: SearchStore.all() });
  },
  render: function () {
    return (
      <ul className="dropdown-menu search">
        <li>
          <div className="input-group search">
            <input className="form-control" type="text" placeholder="Search" onKeyUp={this.updateResults} />
          </div>
        </li>
        {
          this.state.results.map(function (result) {
            return <SearchIndexItem result={result} key={result.id} />
          })
        }
      </ul>
    );
  }
});
