class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :tags, :collection, :published, :user_id

   class UserSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :last_name, :email, :permission_level, :active, :password, :password_confirmation
  end
end
