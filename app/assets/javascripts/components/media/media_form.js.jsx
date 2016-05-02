var MediaForm = React.createClass ({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {title: "", url: "", description: ""};
  },

  componentDidMount: function () {
    MediaStore.addChangeListener(this.onSuccess);
  },

  componentWillUnmount: function () {
    MediaStore.removeChangeListener(this.onSuccess);
  },

  onSuccess: function () {
    var url = "users/" + (CURRENT_USER_ID);
    this.history.pushState(null, url);
  },

  handleTitle: function (e) {
    this.setState({title: e.target.value});
  },

  handleDesc: function (e) {
    this.setState({description: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    ApiUtil.createMedium({ media_url: this.state.url, title: this.state.title, description: this.state.description});
  },

  handleLink: function (e) {
    e.preventDefault();
    var options = {
                    upload_preset: window.cloudinary_upload_preset,
                    cloud_name: window.cloudinary_cloud_name,
                    theme: 'minimal',
                    cropping: 'server',
                    cropping_aspect_ratio: 1,
                    cropping_default_selection_ratio: 1,
                  };
    cloudinary.openUploadWidget(options, this.handleResponse);
  },

  handleResponse: function (error, result) {
    if(error) {
      console.log(error);
    } else {
      var url = "https://res.cloudinary.com/catstagram/image/upload/h_600,w_600/" + result[0].path;
      this.setState({url: url});
    }
  },

  handleReset: function (e) {
    this.setState({title: "", description: "", url: null});
  },

  render: function () {
    var url = this.state.url || "http://res.cloudinary.com/catstagram/image/upload/v1445014670/g6xesy4cm99zroz96rcc.png";

    return (
      <form className="media-form group">
        <div className="column1">
          <input className="media-title" placeholder="Title" type="text" name="title" value={this.state.title} onChange={this.handleTitle}></input>
          <br/>
          <textarea className="media-desc" placeholder="  Description  " name="description" value={this.state.description} onChange={this.handleDesc}></textarea>
          <input className="media-submit" type="submit" value="Create new media" onClick={this.handleSubmit}/>
        </div>
        <div className="column2">
          <img className="media-img" src={url}/>
          <button className="media-upload-button widget" onClick={this.handleLink}> Upload </button>
          <button className="media-reset" onClick={this.handleReset}> Reset </button>
        </div>
      </form>
      );
    }
});
