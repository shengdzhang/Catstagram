class Api::RelationshipsController < ApplicationController
  before_action :require_log_in

  def create
    user = User.find(params[:id])
    current_user.follow!(user)
    render json: {}
  end

  def destroy
    user = Relationship.find(params[:id]).followee
    current_user.unfollow!(user)
    render json: {}
  end
end
