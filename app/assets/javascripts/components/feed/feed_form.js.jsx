var FeedForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return { caption: "", media_url: "" };
  },
  createPost: function (e) {
    e.preventDefault();

    ApiUtil.createPost({ media_url: this.state.media_url, caption: this.state.caption });
  },
  mediaUploaded: function (media_url) {
    this.setState({ media_url: media_url });
  },
  render: function () {
    return (
      <div>
          {
            this.state.media_url ?
            <div className="jumbotron col-xs-offset-4 col-xs-4">
              <form className="form-group">
                <img src={this.state.media_url} width="372.656px" />
                <textarea className="form-control" valueLink={this.linkState("caption")} placeholder="Caption"/>
                <button type="submit" className="btn btn-primary form-control" onClick={this.createPost}>Post</button>
                <a href="#"> Cancel</a>
              </form>
            </div> :
            <UploadWidget mediaUploadedHandler={this.mediaUploaded} />
          }
      </div>
    );
  }
});
