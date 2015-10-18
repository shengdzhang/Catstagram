json.extract! @comment, :id, :body, :user_id
json.posted_by current_user.username
