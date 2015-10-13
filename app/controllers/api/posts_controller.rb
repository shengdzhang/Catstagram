class Api::PostsController < ApplicationController
  def create
    @post = Post.new(post_params)

    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def index
    @posts = Post.all
    render :index
  end

  def update
    @post = Post.find(params[:id])

    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def show
    @post = Post.find(params[:id])
    render :show
  end

  def destroy
    @post = Post.find(params[:id])
    render json: @post.errors.full_messages, status: 422 unless @post.destroy
  end

  private

  def post_params
    params.require(:post).permit(:media_url, :user_id)
  end
end
