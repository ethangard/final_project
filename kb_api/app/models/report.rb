class Report < ApplicationRecord
  belongs_to :article, dependent: :destroy
  # belongs_to :user
  serialize :visit_details, Array 
end
