# Phase 1: User Authentication, Note Model and JSON API

## Rails
### Models
* User
* Post
* Media

### Controllers
* UsersController (create, new, show, edit, update, index)
* SessionsController (create, new, destroy)
* CommentsController (create, destroy)
* Api::PicturesController (create, destroy, index, show, update)

### Views
* users/new.html.erb
* users/index.html.erb
* users/edit.erb
* users/update.erb
* users/show.html.erb
* session/new.html.erb
* media/show.json.jbuilder
* media/new.json.jbuilder

## Flux
### Views (React Components)

### Stores

### Actions

### ApiUtil

## Gems/Libraries
* BCrypt
* paperclip