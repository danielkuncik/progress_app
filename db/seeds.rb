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

public

def is_first_letter_upper?
  self[0] == self[0].upcase
end

def is_first_letter_lower?
  self[0] == self[0].downcase
end

require 'csv'

private



csv_text = File.read(Rails.root.join('lib','seeds','quizzes_with_categories.csv'))

CSV.parse(csv_text, :headers => true) do |row|
  category = row['category']
  if QuizCategory.find_by(name: category).nil?
    QuizCategory.create(name: category)
  end
  Quiz.create(name: row['quiz_name'], level: row['level'].to_i, objective: row['objective'], quiz_category: QuizCategory.find_by(name: category))
end

## to download a CSV of quizzes and categories


## to download the interim Q3 csv file
=begin
headers = CSV.open(Rails.root.join('lib','seeds','interim_q3.csv')) {|csv| csv.first}
headers.each do |quiz|
  if quiz.is_first_letter_upper?
    Quiz.create(name: quiz)
  end
end

csv_text = File.read(Rails.root.join('lib','seeds','interim_q3.csv'))

CSV.parse(csv_text, :headers => true) do |row|
  student_name = row['username']
  User.create(name: student_name, section: row['section'],
              password: row['passcode'], password_confirmation: row['password'])

  row.to_hash.each do |quiz_name,grade|

    if grade != nil && quiz_name.is_first_letter_upper?
      Grade.create(value: grade.to_i, user: User.find_by(name: student_name), quiz: Quiz.find_by(name: quiz_name) )
    end

  end
end

#CSV.foreach('formative_results.csv', :headers => true)  do |row|
#  User.create(name: row['name'], section: row['section'])
#end

=end