json.extract! @user, :id, :username, :biography, :profile_pic_url
json.following current_user.following?(@user)
