Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      
      resources :articles, only: [:index, :show, :create, :destroy, :update] do
        resources :comments, only: [:index, :create, :show, :destroy, :update]
      end
      resources :tags, only: [:create, :index, :show, :destroy, :update]

      resource :session, only: [:create, :destroy]

      resources :users, only: [:create, :index, :show] do
        get :current, on: :collection
      end

    end
  end
end
