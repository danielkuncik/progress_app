class QuizCategory < ApplicationRecord
  has_many :quizzes

  validates :name, presence: true, length: {minimum: 5, maximum: 40}

end
