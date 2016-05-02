# Schema Information

## media
column name      | data type          | details
-----------------|--------------------|-----------------------
id               | integer            | not null, primary key
title            | string             | not null
description      | text               | not null
author_id        | integer            | not null, foreign key (references users), indexed
media            | has_attached_file  | not null
commentable_id   |
commentable_type |
archived         | boolean            | not null, default: false

## follows
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
followee_id | integer   | not null, foreign key (references users), indexed
follower_id | string    | not null, foreign key (references users), indexed
description | string    | 

## notifications
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
user_id     | integer   | not null, foreign key (references users), indexed
description | string    | not null
prev_id     | integer   | foreign key (references reminders), indexed

## comments
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
body              | text    | not null
commentable_id    | integer   | not null, foreign key (references commentable), indexed, unique [tag_id]
commentable_type  | integer   | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
