Rails.application.routes.draw do
  default_url_options :host => "localhost:3001"

  resource :users, only: [:create]
  post "/login", to: "auth#login"
  # get "/auto_login", to: "auth#auto_login"
  # get "/user_is_authed", to: "auth#user_is_authed"

  namespace :api do
    namespace :v1 do
      resources :cats
      resources :weights
      get 'user/:id/cats' => 'cats#get_cats', :as => :get_cats
      get 'cat/:id/weights' => 'weights#get_weights', :as => :get_weights
      delete 'cat/:id/weights' => 'weights#clear_weights', :as => :clear_weights
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
