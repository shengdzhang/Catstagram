var UploadWidget = React.createClass({
  mixins: [ReactRouter.History],
  getInitialState: function () {
    return {media_url: ""};
  },
  componentDidMount: function () {
    cloudinary.setCloudName("pixor");
    cloudinary.applyUploadWidget(document.getElementById('widget'),
                                 {
                                   upload_preset: 'zlnkwm25',
                                   theme: 'minimal',
                                   cropping: 'server',
                                   cropping_aspect_ratio: 1,
                                   cropping_default_selection_ratio: 1,
                                   button_class: 'btn-lg btn-primary'
                                 },
                                 function (error, result) {
                                   this.setState({media_url: result[0].secure_url});
                                 }.bind(this));

  },
  render: function () {
    return (
      <div className="jumbotron col-xs-offset-4 col-xs-4">
        {
          this.state.media_url?<FeedForm media_url={this.state.media_url} />:<div id="widget"></div>
        }
      </div>
    );
  }
});
