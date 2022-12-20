class Tag < ApplicationRecord

  before_validation :downcase_name
  before_save :downcase_name

  has_many :taggings, dependent: :destroy
  has_many :articles, through: :taggings

  def downcase_name
    self.name&.downcase!
  end
end
