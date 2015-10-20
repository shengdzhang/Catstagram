class Tagging < ActiveRecord::Base
  validates :post_id, :tag_id, presence: true
  validates :post_id, uniqueness: { scope: :tag_id }

  belongs_to :tag
  belongs_to :post
end
