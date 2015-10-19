class Api::UsersController < ApplicationController
  def index
    @users = User.find_by_query(params[:query])
    render :index
  end

  def show
    @user = User.includes(:followers, :posts, :followees).where(id: params[:id]).first

    render :show
  end

  def update
    @user = current_user

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :biography, :profile_pic_url)
  end
end
