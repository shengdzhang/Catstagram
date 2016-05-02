## Phase 4: Notifications

## Rails
### Models
* Notifications

### Controllers
* Api::NotificationsController (create, index, show)

### Views
* notifications/index.json.jbuilder

## Flux
### Views (React Components)
* NotificationsIndex
  - NotificationsIndexItem
* NotificationsShow
* NotificationsForm

### Stores
* Notifications

### Actions
* ApiActions.receiveAllNotifications
* ApiActions.receiveSingleNotification
* ApiActions.deleteNotification

### ApiUtil
* ApiUtil.fetchAllNotifications
* ApiUtil.fetchSingleNotifications
* ApiUtil.createNotification

## Gems/Libraries
