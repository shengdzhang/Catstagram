Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:create, :new]

  resource :session, only: [:create, :new, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :update] do
      get 'profile' => 'posts#profile_index'
    end

    post 'follow/:id' => 'relationships#create'
    delete 'unfollow/:id' => 'relationships#destroy'

    resources :posts, only: [:create, :index, :destroy, :update, :show] do
      post 'togglefavorite' => 'favorites#create'
      delete 'togglefavorite' => 'favorites#destroy'
      resources :comments, only: [:create]
      resources :taggings, only: [:create]
      delete 'taggings' => 'taggings#destroy'
    end

    resources :comments, only: [:destroy]

    get 'tags/:name' => 'tags#show'
    resources :tags, only: [:index]

    resources :notifications, only: [:index, :create]
    get 'activity' => 'notifications#dropdown'
    patch 'readall' => 'notifications#read_all'
  end
end
