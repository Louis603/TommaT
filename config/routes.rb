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
  delete "empty_cart/:id", to: "order_numbers#empty_cart"
  get '/profile/:id', to: "users#profile"
  post '/search_tags', to: "tags#search_tags"
  post 'search_name', to: "items#search_name"

  # AWS attempt route
  # post '/presigned_url', to: 'direct_upload#create'

  # ActionCable routes
  # resources :conversations, only: [:index, :create]
  # resources :messages, only: [:create]
  # mount ActionCable.server => '/cable'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
