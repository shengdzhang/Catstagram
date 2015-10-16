class UsersController < ApplicationController
  before_action :require_not_logged_in, except: [:update]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    @user.username.downcase!
    
    if @user.save
      log_in!(@user)
      redirect_to root_url
    else
      flash.now['errors'] = @user.errors.full_messages
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :biography, :profile_pic_url)
  end
end
