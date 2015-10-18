json.extract! post, :id, :user_id, :media_url, :caption, :created_at
json.username post.user.username
json.favorited post.favorited_by?(current_user)
json.favorites_count post.favorites.count
