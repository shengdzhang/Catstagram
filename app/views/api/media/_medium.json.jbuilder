json.extract! medium, :id, :user_id, :media_url, :title, :created_at, :description
json.displayname medium.user.displayname
json.liked medium.liked_by?(current_user)
json.likers medium.likers
json.comments medium.comments do |comment|
  json.id comment.id
  json.body comment.body
  json.user_id comment.user_id
  json.medium_id comment.commentable_id
  json.commentable_type comment.commentable_type
  json.posted_by comment.user.displayname
  json.profile_pic comment.user.profile_pic_url
end
