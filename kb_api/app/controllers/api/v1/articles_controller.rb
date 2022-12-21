class Api::V1::ArticlesController < Api::ApplicationController

    # before_action :authenticate_user!  

  def index
    articles = Article.order(created_at: :desc).where(published: true)
    # render json: articles, include: [:favourites => {:include => :user}]
    render json: articles
  end
  
  def show
    article = Article.find params[:id]
    p "current user id"
    p current_user
    # if (current_user.id == article.user_id || !article.published )
    if !article.published 
      render json: article
    else
      p "earl grey"
       view_page(params[:id])
    render json: article
    end
  end

  # def show
  #   article = Article.find params[:id]
  #   if !article.published 
  #   else
  #     p "earl grey"
  #      view_page(params[:id])
  #   render json: article
  #   end
  # end

  def create

    p "article params in rails"
    p article_params

    # Get collection to see if it exists
    collection = Collection.find_by(name: article_params[:collection])

    # Create a new Article
    article = Article.new(title: article_params[:title], body: article_params[:body], collection: article_params[:collection],user_id: article_params[:user_id], published: article_params[:published])
    
    # .each do |x|

    #   tag = Tag.find_by(name: x.name)
    #   if tag == nil
    #     Tag.create(name: x.name)
    #   else
    #   end
    # end    

    # Check if collection is null, if null then create it
    if collection == nil
      Collection.create({name: article_params[:collection]})
    end

     # if article.save!
     # p "tags on params"
     # p article_params[:tags]
     # tags = JSON.parse(params["tags"])
     # p tags

    # p "rambo"
    # p params[:tags]
    tags = params[:tags]

    allTags = []

    tags.each do |t|
      tag = Tag.find_by(name: t)
      if tag == nil
        newTag = Tag.create(name: t)        
        allTags.push(newTag)
      else
        allTags.push(tag)
      end
    end

    p "all tags here"
    p allTags

    article.tags = allTags

   # article.tags = 

    # article.tags = allTags.to_s

    p article_params[:title]


     article.save

      r = Report.create({
      views: 0,
      article_id: article.id,
      user_id: article.user.id
      })
      # end

    render json: {id: article.id}
  end

  def update

    article = Article.find(params[:id])
    # p "The collection sent to rails"    
    # p article_params[:tags]
    # p article_params[:collection]
    collection = Collection.find_by(name: article_params[:collection])
    # p article_params[:collection]
    # p "creating collection..."
    if collection == nil
      newCollection = Collection.create({name: article_params[:collection]})
      newCollection.save
    end


    # Add Tags 
    # tags = params[:tags]

    # allTags = []

    # tags.each do |t|
    #   tag = Tag.find_by(name: t)
    #   if tag == nil
    #     newTag = Tag.create(name: t)        
    #     allTags.push(newTag)
    #   else
    #     allTags.push(tag)
    #   end
    # end

    # p "*************"
    # p allTags
    # p "*************"

    # article.tags = allTags


    #***************-TEST-********************#
    # article = Article.update(title: article_params[:title], body: article_params[:body], collection: article_params[:collection],user_id: article_params[:user_id], published: article_params[:published])


    #***************-TEST-********************#

    #***************-Tags Start-********************#

      # Add Tags 
      tags = params[:tags]
      p "printing TAGS ************"
      p tags

      allTags = []

      tags.each do |t|
        tag = Tag.find_by(name: t)
        if tag == nil
          newTag = Tag.create(name: t)        
          allTags.push(newTag)
        else
          allTags.push(tag)
        end
      end

      p "*************"
      p allTags
      p "*************"

      article.tags = allTags

    #***************-Tags End-********************#


    if article.update(article_params)
      # article.tags = allTags
      p "Printing article params"
      # p article_params
      render json: {id: article.id }
    else
      render(
        json: { errors: article.errors.messages },
        status: 422
      )
    end
  end

  def archive
    article = Article.find params[:id]
    article.published = false
    article.save
    render json: article
  end
  

  def destroy
    article = Article.find params[:id]
    article.destroy
  end

  def favourite_articles    
  end

  def get_draft_articles
    # p 'yogurt'
    # p :current_user
    # p 'greylo'
    temp = current_user
    # puts "temp"
    # p temp
    articles = Article.where(user_id: 1, published: false)
    # p articles
    render json: articles
  end

  def get_collection_articles
    articles = Article.where(collection: 'personal development')
    p "returned articles"
    p articles
    render json: articles
  end

  def get_user_articles
    articles = Article.where(user_id: 1)
    p articles
    render json: articles
  end
  

  private

  # def get_report_view(article_id)
  #   reports_controller = Report.new
  #   reports_controller.request = request
  #   reports_controller.response = response
  #   reports_controller.index(article_id)
  # end

  def view_page(report_params)
    report = Report.find_by(article_id: report_params)
    p "testing view page"
    p report
    report.views += 1
    report.save
    # p "penguin"
    # # p DateTime.current
    # # p current_user_details
    temp_user_hash = {user: current_user, created_at: Time.now.to_i}
    # p temp_user_hash
    # # p temp_user_hash
    # report.visit_details.push(temp_user_hash)
    # report.save
    # else
    #   newReport = Report.new(report_params) 
    #   p newReport 
    # report.save
    # # p report
    # p report.visit_details
    # # render json: report
  end

  def article_params
    # params.require(:article).permit(:title, :body, {collection: [:value, :label]}, :tags, :user_id, :published)
    params.require(:article).permit(:title, :body, :collection, :tags, :user_id, :published, :archived)
  end

end
