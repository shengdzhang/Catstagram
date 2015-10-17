require 'byebug'
class Api::FavoritesController < ApplicationController
  def create
    favorite = current_user.favorites.new(post_id: params[:id])
    debugger
  end

  def destroy

  end
end
