class Api::V1::SearchesController < Api::ApplicationController

  def query
    p search_params
    # p "yellow"
    # p params
    # p search_params[:query]
    #p "turtles"
    #p search_params
    # p search_params
    # p search_params
    # searches = Article.where("title ILIKE ? ",  "%#{search_params[:query]}%")
    # searches = Article.all
    # p search_params
    # testSearch = Search.new search_params
    # p testSearch
    searches = Article.where("title ILIKE ? ", "%wars%")
    # searches = Article.all
    render json: searches
  end


  private 

  def search_params
    params.require(:search).permit(:query)
  end

end
