# Phase 5: Notifications, Tags, and Filters (2 days)

## Rails
### Models
* Tag

### Controllers
* Api::TagsController (create, destroy)

### Views
* tags/show.json.jbuilder

## Flux
### Views (React Components)
  * NotificationsIndex
    - NotificationsIndexItem

### Stores

### Actions
* ApiActions.receiveTagsForPost
* ApiActions.receiveSingleTag
* ApiActions.deleteTag

### ApiUtil
* ApiUtil.fetchAllTagsForPost
* ApiUtil.fetchSingleTag
* ApiUtil.createTag
* ApiUtil.destroyTag

## Gems/Libraries
