Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:create, :new]

  resource :session, only: [:create, :new, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :update] do
      resources :posts, only: [:create]
      get 'profile' => 'posts#profile_index'
    end
    resources :posts, only: [:index, :destroy, :update, :show]
  end
end
