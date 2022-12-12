class Api::V1::TagsController < Api::ApplicationController

  def index
    tags = Tag.all
    render json: tags
  end

  def show
    
  end

  def create
    tag = Tag.new tag_params

    p "kool aid"
    p tag

    if tag.save
    render json: tag
    else

    end
  end

  # def seedCreate
  #   tag = Tag.new tag_params
  #   render json: tag
  # end


  private

  def tag_params
    params.require(:tag).permit(:name)
  end

end
