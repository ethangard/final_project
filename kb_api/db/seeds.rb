# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


# Destroy all content 
Article.destroy_all
Comment.destroy_all
User.destroy_all

collection_array = ["Collection A", "Collection B", "Collection C", "Collection D"]

tags = ["school","work","leisure","sleep", "eat", "pet dogs"]

PASSWORD="123"

def rand_tag(arr)
  return_arr = []
  rand(2..4).times do
    sample = arr.sample
    return_arr.push(sample)
    # arr.delete(sample)
  end
  return_arr
end

10.times do
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    User.create(
    first_name: first_name,
    last_name: last_name,
    email: "#{first_name}@#{last_name}.com",
    password: PASSWORD
    )
end

users = User.all

admin_user = 
  User.create({
      first_name: "Ethan",
      last_name: "Gard",
      email: "test@test.com",
      password: PASSWORD
  })

users = User.all


20.times do

  created_at = Faker::Date.backward(days: 365 * 5)

  a = Article.create({
    title: Faker::Movie.title,
    body: Faker::Lorem.paragraph_by_chars,
    tags: rand_tag(tags),
    collection: collection_array.sample,
    created_at: created_at,
    user: users.sample
  })

  if a.valid?
    rand(2..4).times do
      Comment.create({
        body: Faker::Movie.title,
        article: a, user: users.sample
      })
    end
  end

end

admin_user = 
  User.create({
      first_name: "Ethan",
      last_name: "Gard",
      email: "test@test.com",
      password: PASSWORD
  })

puts "You've just created #{Article.count} Articles 📚"
puts "You've just created #{Comment.count} Comments 💬"
puts "You've just created #{User.count} Users 👽"