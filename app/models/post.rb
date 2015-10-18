# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  media_url  :string           not null
#  caption    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ActiveRecord::Base
  validates :user_id, :media_url, presence: true

  belongs_to :user

  has_many :favorites, dependent: :destroy

  has_many :likers, through: :favorites, source: :user

  def favorited_by?(user)
    user.favorited_posts.include?(self)
  end
end
