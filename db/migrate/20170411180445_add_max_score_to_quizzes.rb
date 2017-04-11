class AddMaxScoreToQuizzes < ActiveRecord::Migration[5.0]
  def change
    add_column :quizzes, :max_score, :integer, default: 20
  end
end
