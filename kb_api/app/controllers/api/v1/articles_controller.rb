class Api::V1::ArticlesController < Api::ApplicationController

    # before_action :authenticate_user!  

  def index
    articles = Article.order(created_at: :desc).where(published: true)
    render json: articles
  end

  def show
    article = Article.find params[:id]
    if !article.published
    else
    render json: article
    end
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

  def favourite_articles    
  end

  def get_draft_articles
    p 'yogurt'
    p :current_user
    p 'greylo'
    temp = current_user
    puts "temp"
    p temp
    articles = Article.where(user_id: 1, published: false)
    p articles
    render json: articles
  end

  private

  def article_params
    params.require(:article).permit(:title, :body, :collection, :tags, :user_id, :published)
  end

end
