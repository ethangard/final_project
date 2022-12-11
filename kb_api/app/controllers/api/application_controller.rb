class Api::ApplicationController < ApplicationController

  skip_before_action :verify_authenticity_token

  def authenticate_user!
    redirect_to new_user_path, notice: "Please sign in" unless user_signed_in?
  end

end