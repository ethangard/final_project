class User < ApplicationRecord
  has_secure_password

  has_many :articles, dependent: :nullify
  # has_many :tags, dependent: :destroy
  # has_many :tagged_articles, through: :tags, source: :article

end
