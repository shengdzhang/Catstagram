class Api::FavoritesController < ApplicationController
  def create
    favorite = current_user.favorites.new(post_params)

    if favorite.save
      render json: { favorited: true }
    else
      render json: favorite.errors.full_messages
    end
  end

  def destroy
    favorite = current_user.favorites.where(post_id: params[:post_id]).first

    if favorite.destroy
      render json: { favorited: false }
    else
      render json: favorite.errors.full_messages
    end
  end

  private

  def post_params
    params.permit(:post_id)
  end
end
