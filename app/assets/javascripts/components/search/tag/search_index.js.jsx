var TagSearchIndex = React.createClass({
  render: function () {
    return (
      <div className="tag-search-items">
        {
          this.state.user.posts.map(function (post) {
            return <TagSearchIndexItem post={post} key={post.id} />;
          })
        }
      </div>
    );
  }
});
