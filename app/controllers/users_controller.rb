class UsersController < ApplicationController

  def new
  end

  def show
    @user = User.find(params[:id])
    @quizzes = Quiz.all
    @grades = @user.grades
    @total_score = 0
    @grades.each do |grade|
      @total_score += grade.value
    end

    @category = nil
    if @total_score >= 28
      @category = 'Advanced'
    elsif @total_score >= 20
      @category = 'Proficient'
    elsif @total_score >= 12
      @category = "Needs Improvement"
    else
      @category = "Warning"
    end
  end

  def index
    @users = User.all
  end

end
