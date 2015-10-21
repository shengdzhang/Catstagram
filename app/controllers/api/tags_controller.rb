class Api::TagsController < ApplicationController
  def index
    @tag = Tag.includes(:posts).where(name: params[:name]).first
    render :index
  end
end
