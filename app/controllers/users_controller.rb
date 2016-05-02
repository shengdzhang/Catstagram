class UsersController < ApplicationController
  before_action :require_not_logged_in, only: [:new, :create]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    @user.displayname = @user.username

    if params[:user][:password] == params[:user][:password_confirmation]
      if @user.save
        log_in(@user)
        redirect_to root_url
      else
        flash.now['errors'] = @user.errors.full_messages
        render :new
      end
    else
      flash.now['errors'] = ["Password confirmation does not match password."]
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :description, :profile_pic_url)
  end
end
