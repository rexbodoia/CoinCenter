class Api::TransactionsController < ApplicationController
  before_action :require_login

  def create
    @transaction = Transaction.new(transaction_params)
    if @transaction.save!
      render '/api/transactions/show'
    else
      render json: ['Something went wrong']
    end
  end

  def index
    @transactions = Transaction.where(user_id: params[:user_id])
    unless @transactions.empty?
      render '/api/transactions/index'
    else
      render json: ['Could not find transactions']
    end
  end

  def show
    @transactions = Transaction.where(user_id: params[:id])
    unless @transactions.empty?
      render '/api/transactions/show'
    else
      render json: ['Could not find transactions']
    end
  end

  private

  def transaction_params
    params.require(:transaction).permit(:date, :user_id, :coin_id, :amount)
  end
end
