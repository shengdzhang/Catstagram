class Api::PostsController < ApplicationController
  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id

    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def index
    @posts = Post.includes(:user).where(user_id: params[:user_id]).order(created_at: :desc)
    render :index
  end

  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
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
    if @post.destroy
      render json: {}
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  private

  def post_params
    params.require(:post).permit(:media_url, :caption)
  end
end
