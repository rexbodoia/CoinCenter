class Api::SessionsController < ApplicationController
  before_action :require_login

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      login(@user)
      render 'api/users/show'
    else
      flash.now[:errors] = ['Invalid username or password'], status: 401
    end
  end

  def destroy
    if current_user
      logout
      render json: {}
    else
      render json: ['No one is signed in'], status: 404
    end
  end
end
