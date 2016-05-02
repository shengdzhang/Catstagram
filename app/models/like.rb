# == Schema Information
#
# Table name: likes
#
#  id         :integer          not null, primary key
#  medium_id  :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Like < ActiveRecord::Base
  validates :medium_id, :user_id, presence: true
  validates :medium_id, uniqueness: { scope: :user_id }

  belongs_to :medium
  belongs_to :user
end
