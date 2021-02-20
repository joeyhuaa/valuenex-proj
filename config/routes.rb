Rails.application.routes.draw do
  root 'main#home'
  post '/data', :to => 'main#new_data'
  post '/data_stream',  :to => 'main#new_data_stream'
end
