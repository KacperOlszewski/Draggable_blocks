Rails.application.routes.draw do
  get 'public/index'

  resources :spots

  root 'public#index'

end
