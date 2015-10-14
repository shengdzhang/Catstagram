var FeedForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return { media_url: "", caption: "" };
  },
  createPost: function (e) {
    e.preventDefault();

    ApiUtil.createPost(this.state);
  },
  render: function () {
    return (
      <div className="well">
        <form className="input-group">
          <input className="form-control" type="text" valueLink={this.linkState("media_url")} placeholder="URL" />
          <textarea className="form-control" valueLink={this.linkState("caption")} placeholder="Caption"/>
          <button type="submit" className="btn btn-primary" onClick={this.createPost}>Post</button>
          <a href="#"> Cancel</a>
        </form>
      </div>
    );
  }
});
