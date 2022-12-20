class User < ApplicationRecord
  has_secure_password
  has_many :articles, dependent: :nullify
  # has_many :tags, dependent: :destroy
  # has_many :tagged_articles, through: :tags, source: :article
  has_many :favourites, dependent: :destroy
  has_many :favourite_articles, through: :favourites, source: :article
end
