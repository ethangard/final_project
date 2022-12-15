# require 'ostruct'
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
# railsTag.destroy_all

collection_array = ["Collection A", "Collection B", "Collection C", "Collection D"]

# tags = ["school","work","leisure","sleep", "eat", "pet dogs"]

PASSWORD="123"

verify_options = ['pending', 'verified', 'in review']

# def rand_tag(arr)
#   return_arr = []
#   rand(2..4).times do
#     sample = arr.sample
#     return_arr.push(sample)
#     # arr.delete(sample)
#   end
#   return_arr
# end

def rand_tag(arr)
  return_arr = []
  rand(2..4).times do

    sample = arr.sample
    # example = OpenStruct.new(:name => sample.name)
    # example = OpenStruct.new(:name => sample.name)
    # sample = arr.sample

    # p "testing"
    # p sample
    # return_arr.push({"id": example.id, "name": example.name})
    # return_arr.push(example.to_json(camelize: :lower))
    # return_arr.push({id: sample.id, name: sample.name})
    # return_arr.push({name: sample.name.to_s})
    # arr.delete(sample)
    # return_arr.push({id: sample.id, name: sample.name.to_s})
    return_arr.push(sample)
  end
    p return_arr
    return_arr
end

ethan_user = 
  User.create({
      first_name: "Ethan",
      last_name: "Gard",
      email: "test@test.com",
      password: PASSWORD,
      admin: true,
      permission_level: 'admin'
  })

admin_user = 
  User.create({
      first_name: "Admin",
      last_name: "Admin",
      email: "admin@admin.com",
      password: PASSWORD,
      admin: true,
      permission_level: 'admin'
  })

write = 
  User.create({
      first_name: "Write",
      last_name: "Write",
      email: "write@write.com",
      password: PASSWORD,
      permission_level: 'write'
  })

read_user = 
  User.create({
      first_name: "Read",
      last_name: "Read",
      email: "read@read.com",
      password: PASSWORD,
      permission_level: 'read'
  })

inactive_user = 
    User.create({
      first_name: "Inactive",
      last_name: "Inactive",
      email: "dead@dead.com",
      password: PASSWORD,
      active: false,
      permission_level: 'read'
  })

# def test_tag_create
  
# end


20.times do
    Tag.create(
        name: Faker::ProgrammingLanguage.name
    )
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
tags = Tag.all
# p tags

# verifies = Verify.create(status: verify_options.sample)

# 10.times do
#   Verify.create({
#     status: Faker::ProgrammingLanguage.name,
#     user_id: users.sample
#   })
# end

# verifies = Verify.all




20.times do

  created_at = Faker::Date.backward(days: 365 * 5)

  a = Article.create({
    title: Faker::Movie.title,
    body: Faker::Lorem.paragraph_by_chars,
    # tags: rand_tag(tags),
    # tags: Tag.create({
    #   name: "test"
    # }, {
    #   name: "test_two"
    # }),
    # tags: rand_tag(tags),
    # tags: Tag.create({
    #   name: rand_tag(tags)
    # }),
    # tags: rand_tag(tags),
    # tags: Tag.create({
    #   name: "test_tag"
    # }),
    # tags: 
    collection: collection_array.sample,
    created_at: created_at,
    user: users.sample,
    # verify: verifies.sample
    # verify: temp_verify  
  })

  # temp_verify = Verify.create({
  #     status: verify_options.sample,
  #     article: self.a,
  #     user: users.sample,
  #   })

  # tempId = a.id

  if a.valid?
    rand(2..4).times do
      Comment.create({
        body: Faker::Movie.title,
        article: a, user: users.sample
      })
    end
     a.tags = tags.shuffle.slice(0, rand(tags.count))
  end

  # if a.valid?
  #     Verify.create({
  #     status: verify_options.sample
  #     article: a,
  #     user: users.sample,
  #   })
  # end

end

articles = Article.all


25.times do 
  Tag.create({
    name: Faker::ProgrammingLanguage.name,
    # article_id: 1
  })
end


puts "You've just created #{Article.count} Articles 📚"
puts "You've just created #{Comment.count} Comments 💬"
puts "You've just created #{User.count} Users 👽"
puts "You've just created #{Tag.count} Tags 🏷️"