var MediaItem = React.createClass({

  render: function () {
    return (
      <li className="media">
        <a href={"#/media/" + this.props.medium.id}>
          <img className= "user-show-img" src={this.props.medium.media_url}/>
        </a>
      </li>
    );
  }
});
