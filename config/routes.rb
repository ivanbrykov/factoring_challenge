Rails.application.routes.draw do
  get '/invoices/new' => 'home#index'
  get '/invoices/:id' => 'home#index', constraints: { format: :html }
  get '/invoices/:id/:perform_action' => 'home#index', constraints: { format: :html }
  resources :invoices do
    member do
      post 'approve' => 'invoices#update'
      post 'reject' => 'invoices#update'
      post 'purchase' => 'invoices#update'
      post 'close' => 'invoices#update'
    end
  end
  root 'home#index'
end
