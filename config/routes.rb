Rails.application.routes.draw do
  resource :users, only: [:create]
  post "/login", to: "auth#login"
  # get "/auto_login", to: "auth#auto_login"
  # get "/user_is_authed", to: "auth#user_is_authed"

  namespace :api do
    namespace :v1 do
      resources :cats
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
