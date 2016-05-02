json.extract! @comment, :id, :body, :user_id, :commentable_id, :commentable_type
json.posted_by current_user.displayname
json.comments @comment.comments
