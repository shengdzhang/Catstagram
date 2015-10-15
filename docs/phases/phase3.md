# Phase 3: Profile Views, Search, and Follows (2 days)

## Rails
### Models
* Relationship

### Controllers
* RelationshipsController (create, destroy)

### Views
* accounts/show.json.jbuilder

## Flux
### Views (React Components)
* ProfileView
  - ProfileViewItem
  - ProfileInformation
  - FollowButton
* ProfileEditForm
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
