var FeedForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return { caption: "" };
  },
  createPost: function (e) {
    e.preventDefault();

    ApiUtil.createPost({ media_url: this.props.media_url, caption: this.state.caption });
  },
  render: function () {
    return (
      <div>
        <form className="form-group">
          <img src={this.props.media_url} width="372.656px" />
          <textarea className="form-control" valueLink={this.linkState("caption")} placeholder="Caption"/>
          <button type="submit" className="btn btn-primary form-control" onClick={this.createPost}>Post</button>
        </form>
        <a href="#"> Cancel</a>
      </div>
    );
  }
});
