Rails.application.routes.draw do
  resources :carts
  resources :order_numbers
  resources :likes
  resources :reviews
  resources :item_tags
  resources :tags
  resources :items
  resources :categories
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # get '/hello', to: 'application#hello_world'

  post '/login', to: "sessions#login"
  get "/me", to: "users#show"
  delete 'logout', to: "sessions#logout"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
