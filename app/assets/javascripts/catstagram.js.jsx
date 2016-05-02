$(function () {
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var rootEl = document.getElementById('catstagram');

  if (rootEl) {
    React.render((
      <Router>
        <Route path="/" component={App}>
          <IndexRoute component={MainIndex} />
          <Route path="media/upload" component={MediaForm} />
          <Route path="users/:id" component={ProfileView} />
          <Route path="media/:id" components={MediumDetail} />
          <Route path="settings" component={UserEditpage} />
        </Route>
      </Router>
    ), rootEl);
  }
});
