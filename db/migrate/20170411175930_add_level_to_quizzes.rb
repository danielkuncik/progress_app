class AddLevelToQuizzes < ActiveRecord::Migration[5.0]
  def change
    add_column :quizzes, :level, :integer
  end
end
