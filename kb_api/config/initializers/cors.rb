Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '127.0.0.1:3000', 'localhost:3000', '127.0.0.1:3001', 'localhost:3001' #whitelist domains
    resource(
      '/api/*', 
      headers: :any, 
      credentials: true, 
      methods: [:get, :post, :path, :put, :options, :delete] 
    )
  end
end