#Users
garrett = User.create!(username: "garrett", password: "password")
katie = User.create!(username: "katie", password: "password")
markov = User.create!(username: "markov", password: "password")

#Posts
post1 = Post.create!(media_url: "http://vignette1.wikia.nocookie.net/princesstutu/images/3/3e/Troll_Face.png/revision/latest?cb=20140111014458", user_id: 1, caption: "They see me trollin")
post2 = Post.create!(media_url: "http://assets.iamdisappoint.com/hashed_silo_content/silo_content/12338/resized/son_I_am_disappoint.jpg", user_id: 2, caption: "I am disappoint.")
post3 = Post.create!(media_url: "https://www.petfinder.com/wp-content/uploads/2012/11/140272627-grooming-needs-senior-cat-632x475.jpg", user_id: 3, caption: "My mother")
post4 = Post.create!(media_url: "http://vignette1.wikia.nocookie.net/princesstutu/images/3/3e/Troll_Face.png/revision/latest?cb=20140111014458", user_id: 1, caption: "Just trollin again")
