User.create!(username: "garrett", password: "password", profile_pic_url: "http://s3-us-west-1.amazonaws.com/witty-avatars/default-avatar-4-l.jpg", biography: "Eat. Sleep. Code. Repeat.")

25.times do |i|
  username = Faker::Internet.user_name
  password = "password"
  profile_pic_url = Faker::Avatar.image
  biography = Faker::Lorem.paragraph(rand(3) + 1)
  User.create!(username: username, password: password, profile_pic_url: profile_pic_url, biography: biography)
end

Post.create!(media_url: "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1444929498/jshbfink34zb4sd1tyvc.gif", user_id: 1, caption: "Hehehe she's so oblivious", created_at: Faker::Date.between(5.weeks.ago, Date.today))
Post.create!(media_url: "https://res.cloudinary.com/pixor/image/upload/v1444929184/yh1fpamdk1xmrwcvppch.jpg", user_id: 1, caption: "Havasu trip, 2015. Can't wait to go back!", created_at: Faker::Date.between(5.weeks.ago, Date.today))
Post.create!(media_url: "https://res.cloudinary.com/pixor/image/upload/v1444867356/pnwpzlvzpvut2ieydmf4.jpg", user_id: 1, caption: "Nebula", created_at: Faker::Date.between(5.weeks.ago, Date.today))

tags = %W(photooftheday awesome cool photography 2k15 random interesting neat fun wow happiness joy life)

tags.each do |name|
  Tag.create!(name: name)
end

3.times do |id|
  post = Post.find(id + 1)
  num_comments = rand(5)
  num_favorites = rand(10)
  num_tags = rand(5)
  user_ids = (1..26).to_a.shuffle
  tag_ids = (1..13).to_a.shuffle
  num_comments.times do
    body = Faker::Lorem.sentence(rand(6) + 1)
    user_id = rand(26) + 1
    post.comments.create!(body: body, user_id: user_id)
  end
  num_favorites.times do |i|
    post.favorites.create!(user_id: user_ids[i])
  end
  num_tags.times do |j|
    post.taggings.create!(tag_id: tag_ids[j])
  end
end

pictures = ["https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1445451636/xbyjru8nvxdwxhv5ul4i.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1445451592/avsy9jynpwa1mi00erom.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1445450994/adsod35vysxatxlbeotl.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1445449605/lait0ekwe2a0f6grlymm.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1445639916/jsd7n1u5azjvorlc2lis.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1445621275/oy1hdaxwseswcnn24lhw.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446230439/espppwjha2j44szmo9s4.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446230494/bnna6pr4f3pbmecj1kcq.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446230586/j2kdp4inlayupolh3uqo.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446230793/z6a70uzyqroibwn1gfpy.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446230880/oazw43dmgxdzpo26ydhp.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446230998/bzwuwkg287ydfib7qib7.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446231051/tqm7y4setl0voxupvopr.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446231455/s5wqmfrnlwvnbgpvlllt.png",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446231600/bg08keym9xmqcmusnszw.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446234605/vpf3qkhigw2tdwajmdad.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235138/t11ilk43ktinttrzaxdy.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235176/n0dnjxda5oion7jys9ay.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235211/nokaf52nrlfqy8rexss5.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235247/rg5ei3ve23g3e1amn1cw.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235342/faluybfcbd1wrbqzwuz4.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235392/qsf7pssnluwznmtmrsfb.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235435/eltjv9obldifndojy7d5.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235475/nuz0txzbyvfg1pgnzbn1.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235570/xnebmagt7es3pimqlrqd.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235609/gvyvy3mln4bff8gpbub0.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235649/qkffdyrjlofwowkc2bsl.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235681/wizwomoy7bfpcsynzlnm.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235734/zqddyw2t2j1teexqxxgt.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235819/ds0hickfulevmyz5epg5.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235894/ou3xzqnewmhhcb2pci9y.png",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235949/zocdbb6occjxp4wk7tgn.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446235979/ct2dvttq1y7om941ta25.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236092/j6tj1jcsxs31zepz7mjm.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236142/ptta7gnygyul6yffjc6v.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236198/mpirhxbwcxgbdscziixn.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236237/q775o7wknjtg1ogvwnl2.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236280/s4ywbwiauur3jahdueos.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236317/vy6gxekf4bgjzkrhuvpb.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236370/ge0ur3lkhzo81eyitkfy.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236399/sokrcuz1lgv5dev1cjjn.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236430/xqxgvzghrsvj1ej6jbcn.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236461/zy8ozej0lossvlgjurw6.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236497/bc8utwhjxwrxz86em4xh.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236536/mpjveljxhvsxrchrcfvx.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236653/oyt5tx974ayu5e4hohsm.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236716/r2d8wtq1fbfkpd3yvmei.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236779/xfm6f0c5o1ltxype4peu.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236826/wreubrfjauueeteaqifl.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446236930/gtoaunvh8obqwvvwqefi.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446237080/ulr56wkgxeopjqk1nmbz.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446237173/gmuv1hqgvhnoyinszz6o.gif",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446237289/hem9gfdggtfuvsx6zxx8.jpg",
  "https://res.cloudinary.com/pixor/image/upload/h_600,w_600/v1446237410/s8gpb0wbpeupcuy8pvns.gif"]

26.times do |i|
  user = User.find(i+1)
  (rand(5) + 7).times do
    caption = Faker::Lorem.sentence(rand(5) + 1)
    media_url = pictures.sample
    created_at = updated_at = Faker::Date.between(5.weeks.ago, Date.today)
    post = user.posts.create!(media_url: media_url, caption: caption, created_at: created_at, updated_at: updated_at)
    num_comments = rand(5)
    num_favorites = rand(10)
    num_tags = rand(5)
    user_ids = (1..26).to_a.shuffle
    tag_ids = (1..13).to_a.shuffle
    num_comments.times do
      body = Faker::Lorem.sentence(rand(6) + 1)
      user_id = rand(26) + 1
      post.comments.create!(body: body, user_id: user_id)
    end
    num_favorites.times do |j|
      post.favorites.create!(user_id: user_ids[j])
    end
    num_tags.times do |k|
      post.taggings.create!(tag_id: tag_ids[k])
    end
  end
  relationships_user_ids = (1..26).to_a.shuffle
  (rand(10) + 10).times do |l|
    user.passive_relationships.create!(follower_id: relationships_user_ids[l]) if relationships_user_ids[l] != user.id
  end
end
