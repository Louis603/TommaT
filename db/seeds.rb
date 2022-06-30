# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

pokemon_image = 'https://media.gamestop.com/i/gamestop/11120694/Pokemon-Legends-Arceus---Nintendo-Switch?$pdp$'

# category
game = Category.create!(name: "Video Game")

###  USERS
louis = User.create!(username:"Louis", password:"123")

#items
game = Item.create!(price: 23.99, name:"pokemon", description:"good game", image: pokemon_image, condition:"good:", user: louis, category: game)

#tags
pokemon = Tag.create!(hashtag: "pokemon")

#item_tags
ItemTag.create!(item: game, tag: pokemon)

#reviews
Review.create!(user: louis, score: 5, comment:"fast shipping")
