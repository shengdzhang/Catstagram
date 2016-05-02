var CommentItem = React.createClass({

  getInitialState: function () {
    return {body: this.props.comment.body, toggle: false};
  },

  textChange: function (e) {
    this.setState({body: e.target.value});
  },

  handleKeyUp: function (e) {
    if (e.keyCode === 13 && this.state.body !== "") {
      ApiUtil.updateComment(this.props.comment.id, this.state.body);
      this.setState({toggle: !this.state.toggle});
    }
  },

  handleToggle: function () {
    this.setState({toggle: !this.state.toggle, body: this.props.comment.body});
  },

  cancelEdit: function () {
    this.handleToggle();
  },

  deleteComment: function () {
    BootstrapDialog.confirm({
      title: 'WARNING',
      message: 'Delete this comment?',
      type: BootstrapDialog.TYPE_WARNING,
      btnCancelLabel: 'Cancel',
      btnOKLabel: 'Delete',
      btnOKClass: 'btn-warning',
      callback: function(result) {
        if (result) {
            ApiUtil.deleteComment(this.props.comment.id);
        }
      }.bind(this)
    });
  },

  commentContent: function () {

    if(this.props.comment.user_id === CURRENT_USER_ID) {
      var edit = <a className="glyphicon pull-right comment-edit glyphicon-edit" onClick={this.handleToggle}></a>
    } else {
      edit = ""
    }

    if(this.state.toggle){
      return (
        <div className="comment-edit-form">
          <input type="text" onKeyUp={this.handleKeyUp} onChange={this.textChange} value={this.state.body}></input>
          <button className="pull-right comment-delete" onClick={this.cancelEdit}>Cancel</button>
        </div>
      );
    } else {
      return (
        <span className="comment-body"> {this.props.comment.body} {edit}</span>
      );
    }
  },

  render: function () {

    if(this.props.comment.user_id) {
      var user = UserStore.findUserName(this.props.comment.user_id);
      var link = UserStore.findUserPic(this.props.comment.user_id);
    }

    return (
      <li className="list-group-item">
        <a className="comment-author" href={"#/users/"+this.props.comment.user_id}> {user}: </a>
        {
          this.props.comment.user_id === window.CURRENT_USER_ID || this.props.postedById === window.CURRENT_USER_ID ?
          <a className="glyphicon glyphicon-trash delete-comment pull-right" onClick={this.deleteComment}></a> : ""
        }
        <br/>
        {this.commentContent()}
      </li>
    );
  }
});
