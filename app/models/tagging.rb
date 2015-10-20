# == Schema Information
#
# Table name: taggings
#
#  id         :integer          not null, primary key
#  post_id    :integer          not null
#  tag_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tagging < ActiveRecord::Base
  validates :post_id, :tag_id, presence: true
  validates :post_id, uniqueness: { scope: :tag_id }

  belongs_to :tag
  belongs_to :post
end
