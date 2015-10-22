class Api::TagsController < ApplicationController
  def index
    @tags = Tag.find_by_query(params[:query])
    render :index
  end

  def show
    @tag = Tag.includes(:posts).where(name: params[:name]).first
    render :show
  end
end
