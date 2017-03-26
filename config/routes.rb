Rails.application.routes.draw do
  get 'users/new'
  get 'users/index'

  get '/users/:id', to: 'users#show'

  root 'application#hello'
end
