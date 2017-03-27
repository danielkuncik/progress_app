Rails.application.routes.draw do
  get 'sessions/new'

  get 'users/new'
  get 'users/index'

  get '/users/:id', to: 'users#show'

  root 'application#hello'


  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
