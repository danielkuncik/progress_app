class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper


  def hello
    render html: "hello, its me. ive been wondering if after all these years youd like to meet"
  end


end
