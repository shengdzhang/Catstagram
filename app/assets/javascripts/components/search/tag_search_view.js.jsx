var TagSearchView = React.createClass({
  getInitialState: function () {
    return { posts: [] };
  },
  componentDidMount: function () {
    SearchStore.addChangeListener(this._onChange);
    ApiUtil.fetchTagSearchResultsPage(this.props.params.name);
  },
  componentWillUnmount: function () {
    SearchStore.removeChangeListener(this._onChange);
  },
  componentWillReceiveProps: function (props) {
    ApiUtil.fetchTagSearchResultsPage(props.params.name);
  },
  _onChange: function () {
    this.setState({ posts: SearchStore.posts() });
  },
  render: function () {
    return (
      <div>
        <div className="page-header">
          <h1>#{this.props.params.name}</h1>
        </div>
        <div className="tag-search-view-items">
          {
            this.state.posts.map(function (post) {
              return <TagSearchViewItem post={post} key={post.id} />
            })
          }
        </div>
      </div>
    );
  }
});
