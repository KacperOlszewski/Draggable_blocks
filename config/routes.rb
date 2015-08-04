Rails.application.routes.draw do

  resources :spots

  root 'spots#index'

end
