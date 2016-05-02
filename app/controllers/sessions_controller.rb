class SessionsController < ApplicationController
  before_action :require_not_logged_in, except: [:destroy]

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user.nil?
      flash.now['errors'] = ['Invalid credentials, please try again']
      render :new
    else
      log_in(@user)
      redirect_to root_url
    end
  end

  def guest
    user = User.guest
    log_in(user)
    redirect_to root_url
  end

  def destroy
    sign_out
    render json: {}
  end
end
