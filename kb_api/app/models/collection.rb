class Collection < ApplicationRecord

  before_validation :downcase_name
  before_save :downcase_name

  def downcase_name
    self.name&.downcase!
  end

end
