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
                                   button_class: 'btn btn-primary'
                                 },
                                 function (error, result) {
                                   this.props.mediaUploadedHandler(
                                     "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/" + result[0].path
                                   );
                                 }.bind(this));
  },
  render: function () {
    return (
      <div>
        <div id="widget"></div>
      </div>
    );
  }
});
