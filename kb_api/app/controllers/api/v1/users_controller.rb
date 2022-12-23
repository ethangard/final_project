class Api::V1::UsersController < Api::ApplicationController

  def current
    render json: current_user    
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  def index
    user = User.order(id: :asc)
    render json: user
  end

  def update
    user = User.find(params[:id])
        if user.update(user_params)
            render json: {id: user.id }
        else
            render(
                json: { errors: user.errors.messages },
                status: 422
            )
        end
  end

  def create
    p "test create"
    user_params = params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :permission_level)
    user = User.new user_params

    if user.save
      # session[:user_id] = user.id
      render json: [id: user.id]
     # render "User successfully created"
     # render
    else
      render(
        json: [error: user.errors.messages],
        status: 422
      )
    end
  end


  def invite_user
    # user_params = params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :permission_level)
    user = User.new user_params

    p "coffee"
    p user

    if user.save    
      # render "User successfully created"
         render json: [id: user.id]
    else
      render(
        json: [error: user.errors.messages],
        status: 422
      )
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :permission_level, :active, :password, :password_confirmation)
  end

end

