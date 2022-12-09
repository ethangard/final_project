class Api::V1::ArticlesController < Api::ApplicationController

  def index
    articles = Article.order(created_at: :desc)
    render json: articles
  end

  def show
    article = Article.find params[:id]
    render json: article
  end

  def create
    article = Article.new(article_params)
    article.save!
    render json: {id: article.id}
  end

  def update

  end

  def destroy
    article = Article.find params[:id]
    article.destroy
  end

  private

  def article_params
    params.require(:article).permit(:title, :body, :collection, :tags)
  end

end
