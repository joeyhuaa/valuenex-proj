Rails.application.routes.draw do
  root 'main#home'
  get '/uploads', :to => 'main#uploads'
  post '/data', :to => 'main#new_data'
end
