# Phase 3: Account Views, Search, and Follows (2 days)

## Rails
### Models
* Relationship

### Controllers
* RelationshipsController (create, destroy)

### Views
* accounts/show.json.jbuilder

## Flux
### Views (React Components)
* AccountView
  - AccountViewItem
  - AccountInformation
  - FollowButton
* AccountEditForm
* SearchIndex
  - SearchIndexItem

### Stores
* SearchItemStore

### Actions
* ApiActions.deleteRelationship
* ApiActions.receiveAllRelationshipsForUser

### ApiUtil
* ApiUtil.createRelationship
* ApiUtil.destroyRelationship

## Gems/Libraries
