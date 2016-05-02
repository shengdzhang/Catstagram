var CommentShow = React.createClass({

  getInitialState: function () {
    return {comment: this.props.comment, comments: []};
  },

  componentDidMount: function () {
    CommentStore.addChangeListener(this._onChange);
    ApiUtil.fetchComment(this.props.comment.id);
  },

  componentWillUnmount: function () {
    CommentStore.removeChangeListener(this._onChange);
  },

  postComment: function (comment) {
    ApiUtil.createNestedComment(this.state.comment.id, comment);
  },

  _onChange: function () {
    var comment = CommentStore.fetchComment(this.props.comment.id);
    var comments = comment.comments || [];
    this.setState({comment: comment, comments: comments});
  },

  render: function () {
    if(this.state.comment.id) {
      return (
        <div>
          <CommentItem comment={this.state.comment}/>
          <ul className="nested-comments list-group group">
            {
                this.state.comments.map (function (comment, idx) {
                  return <CommentItem type="Comment" key={comment.id} comment={comment}/>
                })
            }
            <CommentForm type="Comment" postComment={this.postComment}/>
            </ul>
        </div>

      );
    } else {
      return (
        <div></div>
      );
    }
  }
})
