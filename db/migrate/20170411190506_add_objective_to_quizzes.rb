class AddObjectiveToQuizzes < ActiveRecord::Migration[5.0]
  def change
    add_column :quizzes, :objective, :text
  end
end
