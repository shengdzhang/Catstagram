json.extract! @user, :id, :username, :biography, :profile_pic_url
json.following current_user.following?(@user)
json.posts @user.posts
json.followers @user.followers
json.followees @user.followees
