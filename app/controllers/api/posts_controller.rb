class Api::PostsController < ApplicationController
  def create
    @post = current_user.posts.new(post_params)

    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def index
    @posts = current_user.user_feed

    render :index
  end

  def update
    @post = Post.find(params[:id])

    if !authorize_user(@post.user)
      render json: {}
    elsif @post.update(post_params)
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

    if !authorize_user(@post.user)
      render json: {}
    elsif @post.destroy
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
