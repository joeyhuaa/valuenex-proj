Rails.application.routes.draw do
  root 'main#home'
  post '/data', :to => 'main#new_data'
end
