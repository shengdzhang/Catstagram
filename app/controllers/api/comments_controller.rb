class Api::CommentsController < ApplicationController
  def create
    @comment = Post.find(params[:post_id]).comments.new(comment_params)
    @comment.user_id = current_user.id

    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    comment = Comment.find(params[:id])

    if comment.destroy
      render json: {}
    else
      render json: comment.errors.full_messages, status: 422
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
