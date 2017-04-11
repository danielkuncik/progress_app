class AddCategoryToQuizzes < ActiveRecord::Migration[5.0]
  def change
    add_reference :quizzes, :quiz_category, foreign_key: true
  end
end
