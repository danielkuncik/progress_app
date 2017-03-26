# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#User.create(name: 'kuncik', section: 'massachusetts')
#User.create(name: 'hamilton', section: 'new york')
#User.create(name: 'washington', section: 'virginia')
#User.create(name: 'jefferson', section: 'virginia')
#User.create(name: 'franklin', section: 'pennsylvania')
#User.create(name: 'madison', section: 'virgina')
#User.create(name: 'adams', section: 'massachusetts')


require 'csv'

csv_text = File.read(Rails.root.join('lib','seeds','formative_results.csv'))


CSV.parse(csv_text, :headers => true) do |row|
  User.create(name: row['username'], section: row['section'],
              password: row['passcode'], password_confirmation: row['password'])
end

#CSV.foreach('formative_results.csv', :headers => true)  do |row|
#  User.create(name: row['name'], section: row['section'])
#end
