$(function () {
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var rootEl = document.getElementById('pixor');

  if (rootEl) {
    React.render((
      <Router>
        <Route path="/" component={App}>
          <IndexRoute component={FeedIndex} />
          <Route path="posts/upload" component={FeedForm} />
          <Route path="users/:id" component={ProfileView} />
          <Route path="settings" component={AccountSettings} />
          <Route path="posts/:id" components={PostDetail} />
        </Route>
      </Router>
    ), rootEl);
  }
});
