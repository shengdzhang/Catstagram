# == Schema Information
#
# Table name: media
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text
#  user_id     :integer          not null
#  media_url   :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Medium < ActiveRecord::Base
  validates :user_id, :media_url, :title, presence: true
  default_scope { order('created_at DESC') }

  belongs_to :user

  has_many :likes, dependent: :destroy
  has_many :likers, through: :likes, source: :user

  has_many :comments, as: :commentable, dependent: :destroy

  def liked_by?(user)
    user.liked_media.include?(self)
  end
end
