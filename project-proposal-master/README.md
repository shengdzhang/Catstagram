# Pixor

[http://www.pixor.io/][pixor]

[pixor]: http://www.pixor.io/

## Minimum Viable Product

Pixor is a web application inspired by Instagram built using Ruby on Rails
and React.js. Pixor allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in/out
- [ ] Create, view, edit, and delete photos
- [ ] Edit and update profile picture and biography
- [ ] Search for users by username
- [ ] Follow other users
- [ ] View, favorite, and comment on photos posted by other users
- [ ] Receive notifications about favorites and follows
- [ ] Tag photos with multiple tags and search by tag
- [ ] Apply filters to photos when posting

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Post Model and JSON API (1.5 days)

Phase 1 will consist of implementing user signup and authentication. On
successful signup, the user will be redirected to a landing page that will
eventually hold the root React component. The JSON API for posts will be
completed before working on any front-end work.

[Details][phase-one]

### Phase 2: Flux Architecture and Post CRUD (2.5 days)

In Phase 2, I will set up the React Router and the structure of the React
components which will make up the view. In accordance with the Flux pattern, I
will set up a PostStore that will carry information about the posts that are
being rendered on the page at any given time. An actions file will hold all the
necessary actions for implementing the CRUD functionality. The components will
consist of a `FeedIndex`, `FeedIndexItem`, and `FeedForm`. Photos (with
captions) should be able to be posted, viewed, edited, and destroyed at this
point. This phase will also include a basic implementation of Bootstrap.

[Details][phase-two]

### Phase 3: Account Views, Search, and Follows (2 days)

Phase 3 adds user account views. An account view page should include
the user's profile picture, biography, an option to edit profile information, a
follow/unfollow button, and a grid/list of photos posted by that user. Users
can search for other users by username within the `SearchIndex` component. This
will require a SearchItemStore as well as a `SearchIndexItem` component. The
user account view page will have its own components, including an `AccountView`,
`AccountInformation`, and `AccountViewItem` component. In order to allow
follows, there will need to be a join table in the database and a `FollowButton`
component. Also, there must be an `AccountEditForm` component for editing user
profile information.

[Details][phase-three]

### Phase 4: Comments and Favorites (1 day)

Phase 4 will allow users to comment on and favorite posts.

[Details][phase-four]

### Phase 5: Notifications, Tags, and Filters (2 days)

At the end of Phase 5, users will be able to add tags to posts as a means for
searching. They will also receive notifications when other users follow them,
favorite their posts, or comment on one of their posts. Users will also be
able to add filters to their posts.

[Details][phase-five]

### Phase 6: Styling and Seed Data (1 day)

Phase 6 will involve making the application look more presentable and adding
seed data for the demo account.

### Bonus Features
- [ ] Videos
- [ ] Option to make account private
- [ ] Allow users to tag other users in posts
- [ ] Allow users to see who their biggest fan is
- [ ] Infinite scroll for posts
- [ ] Direct messages

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
