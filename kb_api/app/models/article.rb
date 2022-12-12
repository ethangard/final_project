class Article < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :tags, optional: true
end
