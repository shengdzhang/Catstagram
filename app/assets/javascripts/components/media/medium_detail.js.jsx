var MediumDetail = React.createClass({

  getInitialState: function () {
    return { medium: MediaStore.detailedMedium(), comment: "" };
  },

  componentDidMount: function () {
    MediaStore.addChangeListener(this._onChange);
    ApiUtil.fetchSingleMedium(this.props.params.id);
  },

  componentWillUnmount: function () {
    MediaStore.removeChangeListener(this._onChange);
  },

  componentWillReceiveProps: function (props) {
    ApiUtil.fetchSingleMedium(props.params.id);
  },

  toggleLike: function () {
    ApiUtil.toggleLike(this.state.medium.id, this.state.medium.liked);
  },

  deleteMedium: function (mediumId) {
    BootstrapDialog.confirm({
      title: 'WARNING',
      message: 'Delete this media?',
      type: BootstrapDialog.TYPE_WARNING,
      btnCancelLabel: 'Cancel',
      btnOKLabel: 'Delete',
      btnOKClass: 'btn-warning',
      callback: function(result) {
        if (result) {
          var userId = this.state.medium.user_id;
          ApiUtil.deleteMedium(mediumId, function () {
            window.location.href = "#/users/" + userId;
          });
        }
      }.bind(this)
    });
  },

  renderEditForm: function () {
    BootstrapDialog.show({
      title: 'Update Info',
      message: 'Title <input class="title-form form-control" > </input><br/> Description <textarea class="form-control desc-form">' + this.state.medium.description + '</textarea>',
      buttons: [{
        label: 'Update',
        cssClass: 'btn-primary',
        action: function (dialogRef) {
          var title = dialogRef.getModalBody().find('input').val() || this.state.medium.title;
          var description = dialogRef.getModalBody().find('textarea').val();
          this.updateMedium(title, description);
          dialogRef.close();
        }.bind(this)
      }]
    });
  },

  updateMedium: function (title, description) {
    ApiUtil.updateMedium(this.state.medium.id, {title: title, description: description});
  },

  showLikers: function () {
    var listOfUsers =
      this.state.medium.likers.map(function (user) {
        return '<a href="#/users/' + user.id + '">' + user.displayname + '</a>';
      }).join('<br/>');

    BootstrapDialog.show({
      title: 'Liked By:',
      message: listOfUsers,
    });
  },

  postComment: function (comment) {

    ApiUtil.createMediaComment(this.state.medium.id, comment);

  },

  _onChange: function () {
    this.setState({ medium: MediaStore.detailedMedium() });
  },

  render: function () {

    var likers = this.state.medium.likers;

    return (

      <div className="col-xs-offset-1 media-show">

        <img className="media-show-img" src={this.state.medium.media_url} />

        <div className="medium-detail">
          <h2 className="text-center medium-detail-user">Created By <a href={"#/users/" + this.state.medium.user_id}>{this.state.medium.displayname}</a></h2>
          <h5 className="medium-detail-time pull-right"><em>Created {this.state.medium.created_at ? jQuery.timeago(this.state.medium.created_at) : ""}</em></h5>
          <h5 className="medium-detail-title"><strong>{this.state.medium.title}</strong></h5>
          <h6 className="medium-detail-description">
            Description: {this.state.medium.description}
          </h6>

          <div className="medium-detail-symbols">
            <div className="medium-detail-likes" onClick={this.showLikers}>
              <a className="pull-left">
                {
                  likers ?
                  likers.length + (likers.length != 1 ? " Likes" : " Like") :
                  "0 Likes"
                }
              </a>
            </div>

            {
              this.state.medium.user_id === window.CURRENT_USER_ID ?
              <div className="medium-controls pull-right">
                <a onClick={this.renderEditForm}>
                  <span className="glyphicon glyphicon-edit"></span>
                </a>
                <a onClick={this.deleteMedium.bind(null, this.state.medium.id)}>
                  <span className="glyphicon glyphicon-trash"></span>
                </a>
              </div> : ""
            }
          </div>

          <br/>
          <br/>

          <div className="post-detail-comments-section group">
            {
              this.state.medium.comments ?
              this.state.medium.comments.map(function (comment) {
                return <CommentShow comment={comment} key={comment.id} />
              }.bind(this)) :
              ""
            }
          </div>

          <div className="input-group input-group">
            <a className="input-group-addon" onClick={this.toggleLike}>
              {
                this.state.medium.liked ?
                <span className="glyphicon glyphicon-heart pull-left"></span> :
                <span className="glyphicon glyphicon-heart-empty pull-left"></span>
              }
            </a>

            <CommentForm type="Medium" postComment={this.postComment}/>
          </div>
        </div>
      </div>
    );
  }
});
