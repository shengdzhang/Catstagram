class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def require_log_in
    redirect_to new_session_url unless current_user
  end

  def require_not_logged_in
    redirect_to root_url if current_user
  end

  def authorize_user(user)
    user == current_user
  end

  def logged_in?
    current_user != nil
  end

  def log_in(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

end
