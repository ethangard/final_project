class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
  # def serializable_hash(options = {})
  #   hash = super
  #   return hash unless options[:camelize]

  #   hash.deep_transform_keys { |key| key.to_s.camelize(options[:camelize]) }
  # end
end


# class ApplicationRecord < ActiveRecord::Base
#   self.abstract_class = true
#   default_scope { order(:created_at) }
#   before_create -> { self.id = SecureRandom.uuid }
# end