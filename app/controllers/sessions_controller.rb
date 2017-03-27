class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(name: params[:session][:username])
    if user && user.authenticate(params[:session][:password])
      log_in user
      redirect_to root_url + 'users/' + String(session[:user_id]) # not rails way
    else
      # create an error message
      render 'new'
    end
  end
end
