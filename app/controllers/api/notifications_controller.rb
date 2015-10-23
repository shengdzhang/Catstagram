class Api::NotificationsController < ApplicationController
  def create
    @notification = Notification.new(notification_params)

    if @notification.save
      render json: {}
    else
      render json: @notification.errors.full_messages, status: 422
    end
  end

  def index
    @notifications = Notification.where(user_id: current_user.id)

    render :index
  end

  def dropdown
    @notifications = Notification.where(user_id: current_user.id).limit(15)

    render :index
  end

  def read_all
    current_user.notifications.update_all(checked: true)

    render json: {}
  end

  private

  def notification_params
    params.require(:notification).permit(:user_id, :message, :href)
  end
end
