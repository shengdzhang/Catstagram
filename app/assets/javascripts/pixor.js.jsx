$(function () {
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var rootEl = document.getElementById('pixor');

  React.render((
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={FeedIndex} />
        <Route path="posts/new" component={FeedForm} />
      </Route>
    </Router>
  ), rootEl);
});
