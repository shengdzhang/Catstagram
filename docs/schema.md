# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
profile_pic_url | string    |
biography       | text      |

## posts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
media_url   | string    | not null
caption     | text      | 
user_id     | integer   | not null, foreign key (references users), indexed

## relationships
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | integer   | not null, foreign key (references users), indexed, unique [:following_id]
following_id| integer   | not null, foreign key (references users), indexed

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
post_id     | integer   | not null, foreign key (references posts), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
user_id     | integer   | not null, foreign key (references users), indexed
post_id     | integer   | not null, foreign key (references posts), indexed

## favorites
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed, unique [post_id]
post_id     | integer   | not null, foreign key (references posts), indexed
