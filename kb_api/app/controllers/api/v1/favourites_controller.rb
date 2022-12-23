class Api::V1::FavouritesController < Api::ApplicationController

  def create
    p "coffee"
    p current_user
    article = Article.find(params[:article_id])
    p article
    favourite = Favourite.new(user:current_user, article: article)
    # p favourite
    favourite.save
      render json: favourite    
  end

  # def create
  #       article = Article.find(params[:article_id])
  #       # if article.user.id == current_user.id
  #       #     p "article owner cannot make his/her item favourite"
  #       #     # redirect_to article_path(article.id)
  #       # else
  #           favourite = Favourite.new(user:current_user, article: article)
  #           if favourite.save
  #               p "Added to favourites"
  #               render json: favourite
  #           else
  #               p favourite.errors.full_messages.join(', ')
  #           end          
  #   end

  def destroy
    favourite = Favourite.find(params[:id])
    render json: {id: favourite.id}
    favourite.destroy
  end

  def index
    # favourites = Favourite.where(user_id: current_user)
    # favourites = Favourite.all
    p "************"
    # favourites = Favourite.joins(:article).where(:articles => { :user_id => current_user.id })
    favourites = Favourite.where(user_id: current_user.id)
    fav_ids = 
    articles = Article.where
    p favourites
    p "************"
    render json: favourites
  end

  private

  def favourite_params
    params.require(:favourite).permit(:user, :article)
  end

  def favourite_ids(arr)

  end

end
