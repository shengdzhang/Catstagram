json.array! @tag.posts do |post|
  json.id post.id
  json.media_url post.media_url
end
