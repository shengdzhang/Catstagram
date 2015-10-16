#Users
User.create!(username: "garrett", password: "password", profile_pic_url: "http://s3-us-west-1.amazonaws.com/witty-avatars/default-avatar-4-l.jpg", biography: "Hey")

50.times do |i|
  username = Faker::Internet.user_name
  password = "password"
  profile_pic_url = Faker::Avatar.image
  biography = Faker::Lorem.paragraph(3)
  User.create!(username: username, password: password, profile_pic_url: profile_pic_url, biography: biography)
end

#Posts
Post.create!(media_url: "https://res.cloudinary.com/pixor/image/upload/v1444929498/jshbfink34zb4sd1tyvc.gif", user_id: 1, caption: "Hehehe so oblivious")
Post.create!(media_url: "https://res.cloudinary.com/pixor/image/upload/v1444929184/yh1fpamdk1xmrwcvppch.jpg", user_id: 1, caption: "Coooool")
Post.create!(media_url: "https://res.cloudinary.com/pixor/image/upload/v1444867356/pnwpzlvzpvut2ieydmf4.jpg", user_id: 1, caption: "Nebula")

50.times do |i|
  user = User.find(i+2)
  10.times do
    caption = Faker::Lorem.paragraph(2)
    user.posts.create!(media_url: "http://placecreature.com/600/600", caption: caption)
  end
end
