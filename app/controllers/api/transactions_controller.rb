class Api::TransactionsController < ApplicationController
  before_action :require_login

  def create
    @transaction = Transaction.new(transaction_params)
    if @transaction.save
      render '/api/transactions/show'
    else
      render json: ['Something went wrong']
    end
  end

  def index
    @transactions = Transaction.all
    render '/api/transactions/index'
  end

  def show
    @transaction = Transaction.find_by(id: params[:id])
    if @transaction
      render '/api/transactions/show'
    else
      render json: ['Transaction could not be found']
    end
  end

  private

  def transaction_params
    params.require(:transaction).permit(:date, :user_id, :coin_id, :amount)
  end
end
