class Api::LikesController < ApplicationController
  def create
    like = current_user.likes.new(medium_params)

    if like.save
      render json: { liked: true }
    else
      render json: like.errors.full_messages, status: 422
    end
  end

  def destroy
    like = current_user.likes.where(medium_id: params[:medium_id]).first

    if like.destroy
      render json: { liked: false }
    else
      render json: like.errors.full_messages, status: 422
    end
  end

  private

  def medium_params
    params.permit(:medium_id)
  end
end
