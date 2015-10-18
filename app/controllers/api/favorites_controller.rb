class Api::FavoritesController < ApplicationController
  def create
    favorite = current_user.favorites.new(post_id: params[:post_id])

    if favorite.save
      render json: {}
    else
      render json: favorite.errors.full_messages
    end
  end

  def destroy
    favorite = current_user.favorites.where(post_id: params[:post_id]).first

    if favorite.destroy
      render json: {}
    else
      render json: favorite.errors.full_messages
    end
  end
end
