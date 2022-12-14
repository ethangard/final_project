class Api::V1::FavouritesController < Api::ApplicationController

  def create
    article = Article.find(params[:article_id])
    favourite = Favourite.new(user: current_user, article: article)
    render json: favourite
  end

  def destroy
    favourite = Favourite.find(params[:id])
    render json: {id: favourite.id}
    favourite.destroy
  end

  def index
    favourites = Favourite.all
    render json: favourites
  end

end
