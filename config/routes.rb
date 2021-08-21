Rails.application.routes.draw do
  root to: 'main#home'

  get 'api/uploads', :to => 'main#uploads'

  post 'api/data', :to => 'main#new_data'
  get 'api/data/:id', :to => 'main#get_data'
  delete 'api/data/:id', :to => 'main#delete_data'

  get '*path', :to => 'main#home'
end
