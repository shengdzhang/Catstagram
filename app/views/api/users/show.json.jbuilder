json.extract! @user, :id, :displayname, :description, :profile_pic_url
json.following current_user.following?(@user)
json.media @user.media
json.followers @user.followers
json.followees @user.followees
