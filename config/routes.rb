Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:create, :new]

  resource :session, only: [:new, :create, :destroy] do
    member do
      post :guest
    end
  end

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :update] do
      get 'profile' => 'media#profile_index'
      get 'activity' => 'users#index'
    end

    post 'follow/:id' => 'relationships#create'
    delete 'unfollow/:id' => 'relationships#destroy'

    resources :media, only: [:create, :index, :destroy, :update, :show] do
      post 'togglelike' => 'likes#create'
      delete 'togglelike' => 'likes#destroy'
    end

    resources :comments, only: [:create, :destroy, :update, :show]

  end
end
