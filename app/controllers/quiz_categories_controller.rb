class QuizCategoriesController < ApplicationController

  def show
    @category = QuizCategory.find(Integer(params[:id]))
    @quizzes = @category.quizzes
  end

end
