class Article < ApplicationRecord
  belongs_to :user
  # belongs_to :report, dependent: :destroy
  # belongs_to :verify, optional: true
  # belongs_to :verifies_links_table, through: :verifies, source: :verify
  has_many :comments, dependent: :destroy
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings
  has_many :favourites, dependent: :destroy
  has_many :favourite_users, through: :favourites, source: :user
  serialize :collection 
end
