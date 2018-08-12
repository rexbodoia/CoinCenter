class Api::PricesController < ApplicationController
  #
  # def import
  #   Price.import(params[:file])
  #   render json: ['it worked']
  # end

  def create
    @price = Price.create(price_params)
    render '/api/prices/show'
  end

  def index
    @eth_prices = [];
    @bch_prices = [];
    @ltc_prices = [];
    @btc_prices = [];
    @all_prices = Price.all
    @all_prices.each do |price|
      case price.coin_id
      when 1
        @eth_prices.push(price);
      when 2
        @bch_prices.push(price);
      when 3
        @ltc_prices.push(price);
      when 4
        @btc_prices.push(price);
      end
    end
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
