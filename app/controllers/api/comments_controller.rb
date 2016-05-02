class Api::CommentsController < ApplicationController

  def create
    if (params[:type] === "Medium")
      @comment = Medium.find(params[:type_id]).comments.new({commentable_type: params[:type], commentable_id: params[:type_id], body: params[:body]})
      @comment.user_id = current_user.id
      if @comment.save
        render :show
      else
        render json: @comment.errors.full_messages, status: 422
      end
    elsif (params[:type] === "Comment")
      @comment = Comment.find(params[:type_id]).comments.new({commentable_type: params[:type], commentable_id: params[:type_id], body: params[:body]})
      @comment.user_id = current_user.id
      if @comment.save
        render :show
      else
        render json: @comment.errors.full_messages, status: 422
      end
    end
  end

  def show
    @comment = Comment.find(params[:id])
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update({body: params[:body]})
      render :update
    else
      render json: @comment.errors.full_messages, status: 422
    end;
  end

  def destroy
    @comment = Comment.find(params[:id])

    if @comment.destroy
      render json: @comment
    else
      render json: comment.errors.full_messages, status: 422
    end
  end

end
