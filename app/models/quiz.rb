class Quiz < ApplicationRecord
  has_many :grades
  belongs_to :quiz_category
end
