Rails.application.routes.draw do
  # get 'rails/db:migrate'
  namespace :api, defaults: {format: :json} do
    namespace :v1 do

      # resources :searches, only: [:index, :create]
      # resource :searches, only: [:query]
      get "/searches", to: 'searches#query'
      get "/favourites_articles" => "articles#favourite_articles"
      get "admin/users/new", to: 'users#invite_user'
      post "/users/invite_user", to: 'users#invite_user'
      get "/drafts", to: 'articles#get_draft_articles'
      # post "/searches", to: 'searches#query'
      
      resources :articles, only: [:index, :show, :create, :destroy, :update] do
        resources :favourites, only: [:create, :index]
        delete 'favourites/:id', to: 'favourites#destroy', as: :remove_favourite
        resources :comments, only: [:index, :create, :show, :destroy, :update]
      end
      resources :tags, only: [:create, :index, :show, :destroy, :update]
      resources :collections, only: [:create, :index, :show]

      resource :session, only: [:create, :destroy]

      resources :users, only: [:create, :index, :show, :update, :invite_user] do
        get :current, on: :collection
      end

    end
  end
end
