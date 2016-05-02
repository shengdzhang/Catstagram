class Api::MediaController < ApplicationController
  def create
    @medium = current_user.media.new(medium_params)

    if @medium.save
      render :show
    else
      render json: @medium.errors.full_messages, status: 422
    end
  end

  def profile_index
    @media = Medium.includes(:user, :likers).where(user_id: params[:user_id])

    render :index
  end

  def index
    media = Kaminari.paginate_array(current_user.user_feed)
    @media = media.page(params[:page]).per(24)

    render :index
  end

  def update
    @medium = Medium.includes(:user, :likers).find(params[:id])
    if !authorize_user(@medium.user)
      render json: {}
    elsif @medium.update(medium_params)
      render :show
    else
      render json: @medium.errors.full_messages, status: 422
    end
  end

  def show
    @medium = Medium.find(params[:id])

    render :show
  end

  def destroy
    @medium = Medium.find(params[:id])
    if !authorize_user(@medium.user)
      render json: {}
    elsif @medium.destroy
      render json: {}
    else
      render json: @medium.errors.full_messages, status: 422
    end
  end

  private

  def medium_params
    params.require(:medium).permit(:media_url, :title, :description)
  end
end
