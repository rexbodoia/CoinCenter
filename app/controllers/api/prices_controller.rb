class Api::PricesController < ApplicationController
  
  def create
    @price = Price.create(price_params)
    render '/api/prices/show'
  end

  def index
    @prices = Price.all
    render '/api/prices/index'
  end

  def show
    @price = Price.find_by(id: params[id])
    if @price
      render '/api/prices/show'
    else
      render json: ['No price available for this date']
    end
  end

  private

  def price_params
    params.require(:price).permit(:date, :coin_id, :price)
  end
end
