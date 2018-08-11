class Api::CardsController < ApplicationController
  before_action :require_login

  def create
    @card = Card.new(card_params)
    if @card.save
      render '/api/cards/show'
    else
      render json: ['Invalid information']
    end
  end

  def index
    @cards = Card.all
    render '/api/cards/index'
  end

  def show
    @card = Card.find_by(id: params[:id])
    if @card
      render '/api/cards/show'
    else
      render json: ['Could not find card']
    end
  end

  def update
    @card = Card.find_by(id: params[:id])
    if @card && @card.update_attributes(card_params)
      render '/api/cards/show'
    else
      render json: ['Could not update card']
    end
  end

  def destroy
    @card = Card.find_by(id: params[:id])
    if @card
      destroy(params[:id])
      render '/api/cards/index'
    else
      render json: ['Unable to remove card']
    end
  end

  private

  def card_params
    params.require(:card).permit(:owner_id, :card_num_digest)
  end
end
