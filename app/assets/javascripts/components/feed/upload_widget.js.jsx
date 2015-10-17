var UploadWidget = React.createClass({
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
                                   this.props.mediaUploadedHandler(result[0].secure_url);
                                 }.bind(this));
  },
  render: function () {
    return (
      <div className="jumbotron col-xs-offset-4 col-xs-4">
        <div id="widget"></div>
      </div>
    );
  }
});
