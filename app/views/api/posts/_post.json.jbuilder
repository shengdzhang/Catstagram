json.extract! post, :id, :user_id, :media_url, :caption, :created_at
json.username post.user.username
json.favorited post.favorited_by?(current_user)
json.likers post.likers
json.comments post.comments do |comment|
  json.id comment.id
  json.body comment.body
  json.user_id comment.user_id
  json.posted_by comment.user.username
end
