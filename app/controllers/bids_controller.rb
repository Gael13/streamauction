class BidsController < ApplicationController
  include ActionController::Live

  def index
    @bids = Bid.all 
    @products = Product.all 
  end

  def create
    response.headers["Content-Type"] = "text/javascript"
    attributes = params.require(:bid).permit(:amount, :connection_id)
    @bid = Bid.create!(attributes)
    $redis.publish('bids.create', @bid.to_json)
  end
  
  def events
    start = Time.zone.now
    redis = Redis.new
    redis.subscribe('bids.create') do |on|
      response.headers["Content-Type"] = "text/event-stream"
      on.message do |event, data|
        response.stream.write("data: #{data}\n\n")
      end
    end
  rescue IOError
    logger.info "Stream closed"
  ensure
    redis.quit
    response.stream.close
  end
end
