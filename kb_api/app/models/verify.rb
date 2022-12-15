class Verify < ApplicationRecord
  belongs_to :article
  serialize :past_verfications, Array 
end
