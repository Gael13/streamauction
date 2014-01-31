Streamauction::Application.routes.draw do
  
  resources :products
  resources :bids do
    collection { get :events }
  end
  root to: 'bids#index'
end
