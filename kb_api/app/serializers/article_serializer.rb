class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :tags, :collection 
end
