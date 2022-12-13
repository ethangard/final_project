class Api::V1::CollectionsController < Api::ApplicationController


  def index
    collections = Collection.all
    render json: collections
  end

  def show
    collection = Collection.find params[:id]
    render json: collection 
  end

  def create
    collection = Collection.new(collection_params)
    collection.save!
    render json: {id: collection.id}
  end

  private

  def collection_params
    params.require(:collection).permit(:name)
  end

end
