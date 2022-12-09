class Api::V1::UsersController < Api::ApplicationController

  def current
    render json: current_user    
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  def index
    user = User.all
    render json: user
  end

  def create
    user_params = params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    user = User.new user_params

    user.save
    render json: user
    
    # if user.save  
    #   session[:user_id] = user.id
    #   render json: [id: user.id]
    # else
    #   render(
    #     json: [error: user.errors.messages],
    #     status: 422 
    #   )
    # end
    
  end
  

end
