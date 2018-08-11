class Api::BalancesController < ApplicationController
  before_action :require_login

  def update
    @balance = Balance.find_by(id: params[:id])
    if @balance && @balance.update_attributes(balances_params)
      render '/api/balances/index'
    else
      render json: ['Unable to perform transaction']
    end
  end

  def index
    @balances = Balance.all
    render '/api/balances/index'
  end

  def show
    @balance = Balance.find_by(id: params[:id])
    if @balance
      render '/api/balances/show'
    else
      render json: ['Could not find balance']
    end
  end

  private

  def balances_params
    params.require(:balance).permit(:user_id, :coin_id, :amount)
  end
end
