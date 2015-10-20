class Api::TaggingsController < ApplicationController
  def create
    tag = params[:tag]
    found_tag = Tag.find_by_name(tag)

    if found_tag
      tagging = found_tag.taggings.new(post_id: params[:post_id])

      if tagging.save
        render json: {}
      else
        render json: tagging.errors.full_messages, status: 422
      end
    else
      new_tag = Tag.new(name: tag)

      if new_tag.save
        tagging = new_tag.taggings.new(post_id: params[:post_id])

        if tagging.save
          render json: {}
        else
          render json: tagging.errors.full_messages, status: 422
        end
      else
        render json: new_tag.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    Post.find(params[:post_id]).taggings.destroy_all
  end
end
