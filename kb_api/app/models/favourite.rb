class Favourite < ApplicationRecord
  belongs_to :user
  belongs_to :article

  #  validates(
  #   :article_id,
  #   uniqueness:{
  #     scope: :user_id,
  #     message: "Already favourited!"
  #   }
  # )
end
