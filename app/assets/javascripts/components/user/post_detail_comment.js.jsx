var PostDetailComment = React.createClass({
  deleteComment: function () {
    ApiUtil.deleteComment(this.props.comment.post_id, this.props.comment.id);
  },
  render: function () {
    var comment = this.props.comment;

    return (
      <div className="comment wrapword">
        {
          comment.user_id === window.CURRENT_USER_ID || this.props.postedById === window.CURRENT_USER_ID ?
          <a className="glyphicon glyphicon-trash delete-comment pull-left" onClick={this.deleteComment}></a> : ""
        }
        <a href={"#/users/" + comment.user_id}>{comment.posted_by}</a>:
        <br/>
        <p>{comment.body}</p><br/>
      </div>
    );
  }
});
