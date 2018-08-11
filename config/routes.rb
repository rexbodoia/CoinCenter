Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]

    resource :session, only: [:create, :destroy]

    resources :cards, except: [:new, :edit]

    resources :transactions, only: [:create, :index, :show]

    resources :balances, only: [:update, :index, :show]

    resources :prices, only: [:create, :index, :show]
  end
end
