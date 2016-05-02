class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.includes(:followers, :media, :followees).where(id: params[:id]).first
    render :show
  end

  def update
    @user = current_user

    if params[:type] === "Update"
      if @user.is_password?(params[:user][:current_password])
        if @user.update(user_params)
          render :show
        else
          render json: @user.errors.full_messages, status: 422
        end
      else
        render json: "Incorrect password.", status: 422
      end
    elsif params[:type] === "Edit"
      if @user.update(user_params)
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :description, :profile_pic_url)
  end
end
