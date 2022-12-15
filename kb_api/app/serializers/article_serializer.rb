class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :tags, :collection, :published, :user_id, :favourites

   class UserSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :last_name, :email, :permission_level, :active, :password, :password_confirmation
   end

   class FavouriteSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :article_id, :created_at
   end
end
