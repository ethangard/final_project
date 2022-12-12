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
    puts "bananna"
    # p article_params[:tags]
    article = Article.new(title: article_params[:title], body: article_params[:body], collection: article_params[:collection],user_id: article_params[:user_id] )
    p "yama tags"
    p article_params[:tags]
    # article.tags = article_params[:tags]
    # p article_params.tags
    article.save!
    render json: {id: article.id}
  end

  def update
    article = Article.find(params[:id])
        if article.update(article_params)
            render json: {id: article.id }
        else
            render(
                json: { errors: article.errors.messages },
                status: 422
            )
        end
  end

  def destroy
    article = Article.find params[:id]
    article.destroy
  end

  private

  def article_params
    params.require(:article).permit(:title, :body, :collection, :tags, :user_id)
  end

end
