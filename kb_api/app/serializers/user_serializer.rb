class UserSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :last_name, :email, :permission_level, :active, :password, :password_confirmation, :favourites 
end
