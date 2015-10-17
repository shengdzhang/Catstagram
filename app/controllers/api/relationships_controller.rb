class Api::RelationshipsController < ApplicationController
  before_action :require_log_in

  def create
    user = User.find(params[:id])
    current_user.follow!(user)
    render json: { following: current_user.following?(user) }
  end

  def destroy
    user = User.find(params[:id])
    current_user.unfollow!(user)
    render json: { following: current_user.following?(user) }
  end
end
