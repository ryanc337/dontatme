Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :addresses, only: [:create] do
    resources :emails, only: [:index, :show, :create, :destroy] do
      put 'read', on: :member
    end
  end

  mount ActionCable.server => '/cable'
end
