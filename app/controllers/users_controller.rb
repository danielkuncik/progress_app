class UsersController < ApplicationController

  def new
  end

  def show
    @user = User.find(params[:id])
    @quizzes = Quiz.all
    @grades = @user.grades
    @total_score = 0
  end

  def index
    @users = User.all
  end

end
