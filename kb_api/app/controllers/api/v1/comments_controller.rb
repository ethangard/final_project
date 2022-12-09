class Api::V1::CommentsController < Api::ApplicationController

  def index
    p params[:article_id]
    comments = Comment.where(article_id: params[:article_id])
    render json: comments
  end

  def show
    comment = Comment.find params[:id]
    if comment.exists?
      render json: comment
    else
      render( json: {status: 404})
    end
  end

  def create
    comment = Comment.new article_id: params[:article_id]
    p "Check here"
    p comment_params
    comment.body = comment_params[:body]
    comment.save!
    render json: {id: comment.id}
  end

  def update
    
  end

  def destroy
    comment = Comment.find params[:id]
    p comment
    comment.destroy
  end

  private 

  def comment_params
    # params.require(:comment).permit(:body, :article_id)
    params.require(:comment).permit(:body)
  end


end
