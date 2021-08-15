# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require_relative '../lib/populator_fix.rb'

# Data.populate 10 do |d, i|
#   d.id = i
#   d.filename = Faker::Artist.name
#   d.included_data = [
#     {"id"=>"1", "title"=>"LOTR", "author"=>"tolkien"},
#     {"id"=>"1", "title"=>"LOTR", "author"=>"tolkien"},
#     {"id"=>"1", "title"=>"LOTR", "author"=>"tolkien"},
#     {"id"=>"1", "title"=>"LOTR", "author"=>"tolkien"},
#     {"id"=>"1", "title"=>"LOTR", "author"=>"tolkien"},
#   ]
#   d.assigned_data = [
#     {"ID"=>["id", "1"], "Name"=>["title", "LOTR"], "Timestamp"=>["author", "tolkien"]},
#     {"ID"=>["id", "1"], "Name"=>["title", "LOTR"], "Timestamp"=>["author", "tolkien"]},
#     {"ID"=>["id", "1"], "Name"=>["title", "LOTR"], "Timestamp"=>["author", "tolkien"]},
#     {"ID"=>["id", "1"], "Name"=>["title", "LOTR"], "Timestamp"=>["author", "tolkien"]},
#     {"ID"=>["id", "1"], "Name"=>["title", "LOTR"], "Timestamp"=>["author", "tolkien"]},
#   ]
# end

count = 0

while (count < 50) 
  Data.create(
    id: count,
    filename: Faker::Artist.name,
    included_data: [
      {"id"=>"1", "title"=>"LOTR", "author"=>"tolkien"},
      {"id"=>"1", "title"=>"LOTR", "author"=>"tolkien"},
      {"id"=>"1", "title"=>"LOTR", "author"=>"tolkien"},
      {"id"=>"1", "title"=>"LOTR", "author"=>"tolkien"},
      {"id"=>"1", "title"=>"LOTR", "author"=>"tolkien"},
    ],
    assigned_data: [
      {"ID"=>["id", "1"], "Name"=>["title", "LOTR"], "Timestamp"=>["author", "tolkien"]},
      {"ID"=>["id", "1"], "Name"=>["title", "LOTR"], "Timestamp"=>["author", "tolkien"]},
      {"ID"=>["id", "1"], "Name"=>["title", "LOTR"], "Timestamp"=>["author", "tolkien"]},
      {"ID"=>["id", "1"], "Name"=>["title", "LOTR"], "Timestamp"=>["author", "tolkien"]},
      {"ID"=>["id", "1"], "Name"=>["title", "LOTR"], "Timestamp"=>["author", "tolkien"]},
    ]
  )
  count += 1
end